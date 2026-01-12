import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface CitationRequest {
  text: string;
  format: string;
  sampleSize?: string;
  dateRange?: string;
  location?: string;
  parameters?: string;
}

interface Citation {
  studyFindings: string;
  citation: string;
  briefDescription: string;
  location: string;
  date: string;
  participants: string;
  link: string;
  accessibility: string;
  formattedCitation?: string;
}

const SYSTEM_MESSAGE = `You are a citation generator. Provide only the requested information without any additional text. Prioritize free and easily accessible studies when possible. Studies must be real and not made up. You find the studies, the user does not provide a source for you.`;

Deno.serve(async (req: Request) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Verify the user token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid authentication token" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const requestData: CitationRequest = await req.json();

    const userMessage = `Generate a citation for: ${requestData.text}
Requirements:
${requestData.sampleSize ? `- Sample size: ${requestData.sampleSize}` : ''}
${requestData.dateRange ? `- Date range: ${requestData.dateRange}` : ''}
${requestData.location ? `- Geographic location: ${requestData.location}` : ''}
${requestData.parameters ? `- Additional parameters: ${requestData.parameters}` : ''}

Prefer studies that are freely accessible online when available. Always attempt to find and provide a valid link to the study or its abstract.
When you cannot find a study, do not send back a response. 
If the you are provided with variables (e.g. number of participants) where participants are not relevant (e.g. a data abstract study), just ignore that variable. 
Format the response as follows:
Study Findings: [One sentence summary of the main findings]
Citation: [Full citation details without specific formatting]
Brief Description: [2-3 sentence description]
Location: [study location]
Date: [publication date]
Participants: [number of participants in the study]
Link: [link if available, or "Not available" if a valid link cannot be found]
Accessibility: [Indicate if the full study is freely accessible online]`;

    // Make OpenAI API call
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4",
        temperature: 0,
        messages: [
          { role: "system", content: SYSTEM_MESSAGE },
          { role: "user", content: userMessage }
        ]
      })
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error('OpenAI API error:', errorText);
      return new Response(
        JSON.stringify({ error: "Failed to generate citation" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const completion = await openaiResponse.json();
    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      return new Response(
        JSON.stringify({ error: "No response from OpenAI" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse the response into structured data
    const lines = response.split('\n');
    const citation: Partial<Citation> = {};

    lines.forEach(line => {
      const [key, ...valueParts] = line.split(': ');
      const value = valueParts.join(': ').trim();

      switch (key.trim()) {
        case 'Study Findings':
          citation.studyFindings = value;
          break;
        case 'Citation':
          citation.citation = value;
          break;
        case 'Brief Description':
          citation.briefDescription = value;
          break;
        case 'Location':
          citation.location = value;
          break;
        case 'Date':
          citation.date = value;
          break;
        case 'Participants':
          citation.participants = value;
          break;
        case 'Link':
          citation.link = value === 'Not available' ? '' : value;
          break;
        case 'Accessibility':
          citation.accessibility = value;
          break;
      }
    });

    // Format the citation according to the selected style
    const formattingPrompt = `Format the following citation in ${requestData.format} style. Be strict about following the exact rules for ${requestData.format} format:\n${citation.citation}`;
    
    const formattingResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4",
        temperature: 0,
        messages: [
          { role: "system", content: `You are a citation formatter specializing in ${requestData.format} format. You must strictly follow the official ${requestData.format} citation style guide. Do not use any other format. Respond only with the formatted citation.` },
          { role: "user", content: formattingPrompt }
        ]
      })
    });

    if (formattingResponse.ok) {
      const formattingCompletion = await formattingResponse.json();
      citation.formattedCitation = formattingCompletion.choices[0]?.message?.content?.trim();
    }

    return new Response(
      JSON.stringify(citation as Citation),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    console.error('Error in generate-citation function:', error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
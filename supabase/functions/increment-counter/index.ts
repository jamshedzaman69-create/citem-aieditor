import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

Deno.cron("Increment Counter", "*/3 * * * * *", async () => {
  try {
    // Random delay between 3 and 19 seconds
    const delay = Math.floor(Math.random() * (19000 - 3000) + 3000)
    
    // Wait for the random delay
    await new Promise(resolve => setTimeout(resolve, delay))
    
    // Increment the counter
    const { error } = await supabase
      .rpc('increment_counter')
    
    if (error) throw error
    
    console.log('Counter incremented successfully')
  } catch (error) {
    console.error('Error incrementing counter:', error)
  }
})
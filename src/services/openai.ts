import type { Citation, CitationRequest } from '../types';
import { supabase } from './supabase';

export async function generateCitation(request: CitationRequest): Promise<Citation> {
  // Get the current user's session to include the auth token
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error('User not authenticated');
  }

  const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-citation`;

  const headers = {
    'Authorization': `Bearer ${session.access_token}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || 'Failed to generate citation');
  }

  const citation = await response.json();
  return citation as Citation;
}
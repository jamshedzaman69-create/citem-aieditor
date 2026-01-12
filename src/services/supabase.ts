import { createClient } from '@supabase/supabase-js';
import type { Citation, UserProfile } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SavedCitation extends Citation {
  id: string;
  user_id: string;
  created_at: string;
}

export async function saveCitation(citation: Citation): Promise<SavedCitation> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('citations')
    .insert([{
      user_id: user.id,
      ...citation
    }])
    .select()
    .single();

  if (error) throw error;
  return data as SavedCitation;
}

export async function getSavedCitations() {
  const { data, error } = await supabase
    .from('citations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as SavedCitation[];
}

export async function deleteCitation(id: string) {
  const { error } = await supabase
    .from('citations')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No profile found, return null
      return null;
    }
    throw error;
  }
  return data as UserProfile;
}

export async function updateUserProfileSubscriptionId(userId: string, subscriptionId: string): Promise<UserProfile> {
  // First try to update existing profile
  const { data: updateData, error: updateError } = await supabase
    .from('profiles')
    .update({ stripe_subscription_id: subscriptionId })
    .eq('user_id', userId)
    .select()
    .single();

  if (updateError) {
    if (updateError.code === 'PGRST116') {
      // No existing profile, create new one
      const { data: insertData, error: insertError } = await supabase
        .from('profiles')
        .insert([{
          user_id: userId,
          stripe_subscription_id: subscriptionId
        }])
        .select()
        .single();

      if (insertError) throw insertError;
      return insertData as UserProfile;
    }
    throw updateError;
  }

  return updateData as UserProfile;
}
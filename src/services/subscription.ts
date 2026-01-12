import { cache } from '../utils/cache';
import { supabase } from './supabase';

export type SubscriptionStatus = 'Active' | 'Past Due/Overdue' | 'No customer found';

const CACHE_KEY_PREFIX = 'subscription_status_';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export async function checkSubscriptionStatus(email: string): Promise<SubscriptionStatus> {
  try {
    const cacheKey = `${CACHE_KEY_PREFIX}${email}`;
    const cachedStatus = cache.get<SubscriptionStatus>(cacheKey);
    
    if (cachedStatus) {
      return cachedStatus;
    }
    
    const response = await fetch(`https://shepherdpay.atrus.uk/subscription-status?email=${encodeURIComponent(email)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const status = await response.text();
    
    if (status === 'Active') {
      cache.set(cacheKey, status, CACHE_TTL);
    }
    
    return status as SubscriptionStatus;
  } catch (error) {
    console.error('Error checking subscription:', error instanceof Error ? error.message : 'Unknown error');
    return 'No customer found';
  }
}

export async function getSubscriptionIdFromCheckoutSession(checkoutSessionId: string): Promise<string> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('User not authenticated');
    }

    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-stripe-subscription`;

    const headers = {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ checkoutSessionId })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || 'Failed to retrieve subscription ID');
    }

    const data = await response.json();
    return data.subscriptionId;
  } catch (error) {
    console.error('Error getting subscription ID:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}
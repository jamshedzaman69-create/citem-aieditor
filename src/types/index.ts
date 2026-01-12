export interface Citation {
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

export type CitationFormat = 
  | 'MLA8'
  | 'Chicago'
  | 'APA'
  | 'Harvard'
  | 'MHRA'
  | 'Vancouver'
  | 'OSCOLA';

export interface UserProfile {
  id: string;
  user_id: string;
  stripe_subscription_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CitationRequest {
  text: string;
  format: CitationFormat;
  sampleSize?: string;
  dateRange?: string;
  location?: string;
  parameters?: string;
}

export type { SubscriptionStatus } from '../services/subscription';
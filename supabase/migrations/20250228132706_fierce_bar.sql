/*
  # Create citations table and setup RLS policies

  1. New Tables
    - `citations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `study_findings` (text)
      - `citation` (text)
      - `brief_description` (text)
      - `location` (text)
      - `date` (text)
      - `participants` (text)
      - `link` (text)
      - `accessibility` (text)
      - `formatted_citation` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `citations` table
    - Add policies for authenticated users to:
      - Read their own citations
      - Insert their own citations
      - Delete their own citations
*/

CREATE TABLE IF NOT EXISTS citations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  study_findings text NOT NULL,
  citation text NOT NULL,
  brief_description text NOT NULL,
  location text NOT NULL,
  date text NOT NULL,
  participants text NOT NULL,
  link text,
  accessibility text NOT NULL,
  formatted_citation text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
);

ALTER TABLE citations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own citations"
  ON citations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own citations"
  ON citations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own citations"
  ON citations
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
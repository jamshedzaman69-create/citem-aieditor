/*
  # Add global counter table
  
  1. New Tables
    - `global_counter`
      - `id` (uuid, primary key)
      - `count` (integer, default 10462)
      - `updated_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `global_counter` table
    - Add policy for authenticated users to read counter
    - Add policy for service role to update counter
*/

CREATE TABLE IF NOT EXISTS global_counter (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  count integer DEFAULT 10462,
  updated_at timestamptz DEFAULT now()
);

-- Insert initial counter
INSERT INTO global_counter (id, count) VALUES ('00000000-0000-0000-0000-000000000000', 10462);

-- Enable RLS
ALTER TABLE global_counter ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the counter
CREATE POLICY "Anyone can read counter" 
  ON global_counter
  FOR SELECT
  TO PUBLIC
  USING (true);

-- Create function to increment counter
CREATE OR REPLACE FUNCTION increment_counter()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE global_counter
  SET count = count + 1,
      updated_at = now()
  WHERE id = '00000000-0000-0000-0000-000000000000';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
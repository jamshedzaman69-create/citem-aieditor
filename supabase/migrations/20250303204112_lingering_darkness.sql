/*
  # Fix column names to match application

  1. Changes
    - Rename columns to match camelCase naming in the application:
      - brief_description -> briefDescription
      - study_findings -> studyFindings
      - formatted_citation -> formattedCitation

  2. Security
    - Existing RLS policies are preserved
*/

DO $$ 
BEGIN
  -- Only rename if columns exist in their current form
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'citations' 
    AND column_name = 'brief_description'
  ) THEN
    ALTER TABLE citations RENAME COLUMN brief_description TO "briefDescription";
  END IF;

  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'citations' 
    AND column_name = 'study_findings'
  ) THEN
    ALTER TABLE citations RENAME COLUMN study_findings TO "studyFindings";
  END IF;

  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'citations' 
    AND column_name = 'formatted_citation'
  ) THEN
    ALTER TABLE citations RENAME COLUMN formatted_citation TO "formattedCitation";
  END IF;
END $$;
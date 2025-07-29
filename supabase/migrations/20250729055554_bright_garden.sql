/*
  # Add tags column for enhanced search

  1. Changes
    - Add `tags` column to `courses` table
    - Column will store searchable keywords/tags
    - Tags are not visible in UI, only editable in Supabase
    - Update search functionality to include tags

  2. Security
    - Maintain existing RLS policies
    - Tags column follows same security rules as other columns
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'tags'
  ) THEN
    ALTER TABLE courses ADD COLUMN tags text DEFAULT '';
  END IF;
END $$;
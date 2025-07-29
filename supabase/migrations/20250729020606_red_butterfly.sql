/*
  # Add course link field

  1. Changes
    - Add `link` column to `courses` table for storing course detail URLs
    - Set default empty string for existing records
    - Make field nullable to allow flexibility

  2. Security
    - No additional RLS policies needed as it inherits from existing table policies
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'link'
  ) THEN
    ALTER TABLE courses ADD COLUMN link text DEFAULT '';
  END IF;
END $$;
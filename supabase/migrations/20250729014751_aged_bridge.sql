/*
  # Create courses table for course listing website

  1. New Tables
    - `courses`
      - `id` (bigint, primary key)
      - `title` (text, not null) - Course title
      - `description` (text, not null) - Course description
      - `price` (numeric, not null) - Course price in PHP
      - `duration` (text, not null) - Course duration (Short/Medium/Long)
      - `branch` (text, not null) - Branch location (Manila/Cebu/Online)
      - `technology` (text, not null) - Technology category
      - `image_url` (text) - Optional course image
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `courses` table
    - Add policies for public read access (since it's a public course listing)
    - Add policies for authenticated users to manage courses

  3. Sample Data
    - Insert sample courses to demonstrate functionality
*/

CREATE TABLE IF NOT EXISTS courses (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title text NOT NULL,
  description text NOT NULL,
  price numeric(10,2) NOT NULL DEFAULT 0,
  duration text NOT NULL,
  branch text NOT NULL,
  technology text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Allow public read access to courses
CREATE POLICY "Anyone can view courses"
  ON courses
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert, update, delete courses
CREATE POLICY "Authenticated users can manage courses"
  ON courses
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_courses_updated_at 
  BEFORE UPDATE ON courses 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample courses
INSERT INTO courses (title, description, price, duration, branch, technology, image_url) VALUES
('Web Development Bootcamp', 'Complete full-stack web development course covering HTML, CSS, JavaScript, React, and Node.js', 15000, 'Long', 'Manila', 'Web Development', 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg'),
('AI & Machine Learning Fundamentals', 'Introduction to artificial intelligence and machine learning concepts with Python', 12000, 'Medium', 'Cebu', 'AI', 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg'),
('UI/UX Design Masterclass', 'Learn modern design principles, Figma, and user experience best practices', 8000, 'Medium', 'Online', 'Design', 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg'),
('React Development', 'Advanced React concepts including hooks, context, and modern patterns', 10000, 'Medium', 'Manila', 'Web Development', 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg'),
('Python Programming Basics', 'Learn Python programming from scratch with hands-on projects', 6000, 'Short', 'Online', 'Programming', 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg'),
('Mobile App Development', 'Build cross-platform mobile apps using React Native', 18000, 'Long', 'Cebu', 'Mobile Development', 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg'),
('Data Science with R', 'Statistical analysis and data visualization using R programming', 9500, 'Medium', 'Manila', 'Data Science', 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg'),
('Cybersecurity Essentials', 'Learn fundamental cybersecurity concepts and best practices', 7500, 'Short', 'Online', 'Security', 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg'),
('Cloud Computing with AWS', 'Master Amazon Web Services and cloud infrastructure', 13500, 'Long', 'Manila', 'Cloud Computing', 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg'),
('Graphic Design Foundations', 'Learn Adobe Creative Suite and design fundamentals', 5500, 'Short', 'Cebu', 'Design', 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg');
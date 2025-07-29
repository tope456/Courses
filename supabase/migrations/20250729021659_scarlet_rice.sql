/*
  # Add program field to courses table

  1. New Column
    - `program` (text) - Program type for courses
  
  2. Data Updates
    - Set default program values for existing courses
  
  3. Sample Data
    - Add sample courses for each program type
*/

-- Add program column to courses table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'program'
  ) THEN
    ALTER TABLE courses ADD COLUMN program text DEFAULT 'Short Courses';
  END IF;
END $$;

-- Update existing courses with program values
UPDATE courses SET program = 'Short Courses' WHERE program IS NULL;

-- Insert sample courses for different programs
INSERT INTO courses (title, description, price, duration, branch, technology, program, link) VALUES
('Bachelor of Science in Information Technology', 'Comprehensive 2-year IT program covering programming, database management, networking, and system analysis. Prepare for a career in technology with hands-on projects and industry partnerships.', 45000, 'Long', 'Pasig', 'Programming', '2-Year Program', 'https://example.com/bsit'),
('Associate in Computer Technology', 'Focused 2-year program in computer technology fundamentals, hardware troubleshooting, software development, and IT support services.', 38000, 'Long', 'Pasay', 'Programming', '2-Year Program', 'https://example.com/act'),
('STEM Track - Science, Technology, Engineering, Mathematics', 'Senior High School STEM track preparing students for college programs in science and technology fields with advanced mathematics and science subjects.', 25000, 'Long', 'Pasig', 'Programming', 'Senior High', 'https://example.com/stem'),
('ICT Track - Information and Communications Technology', 'Senior High School ICT track focusing on computer programming, web development, and digital media production for tech-savvy students.', 23000, 'Long', 'Pasay', 'Web Development', 'Senior High', 'https://example.com/ict'),
('ABM Track - Accountancy, Business and Management', 'Senior High School business track covering entrepreneurship, business ethics, and financial management for future business leaders.', 22000, 'Long', 'Jalajala', 'Design', 'Senior High', 'https://example.com/abm'),
('Python Programming Bootcamp', 'Intensive 8-week Python programming course covering basics to advanced concepts including web frameworks and data analysis.', 8500, 'Medium', 'Pasig', 'Programming', 'Short Courses', 'https://example.com/python'),
('Digital Marketing Essentials', 'Learn social media marketing, SEO, content creation, and analytics in this comprehensive digital marketing course.', 6500, 'Short', 'Pasay', 'Design', 'Short Courses', 'https://example.com/digital-marketing'),
('Mobile App Development with React Native', 'Build cross-platform mobile applications using React Native. Perfect for web developers transitioning to mobile development.', 12000, 'Medium', 'Pasig', 'Mobile Development', 'Short Courses', 'https://example.com/react-native');
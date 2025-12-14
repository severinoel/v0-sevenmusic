-- Create files table for casiers system
CREATE TABLE IF NOT EXISTS files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- folder, pdf, audio, video, image, document, sheet
  path TEXT DEFAULT '',
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  size BIGINT,
  mime_type VARCHAR(100),
  url TEXT,
  owner_id UUID REFERENCES auth.users NOT NULL,
  starred BOOLEAN DEFAULT FALSE,
  shared BOOLEAN DEFAULT FALSE,
  shared_with UUID[] DEFAULT '{}',
  versions INTEGER DEFAULT 1,
  parent_id UUID REFERENCES files(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Create folders table
CREATE TABLE IF NOT EXISTS folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  parent_path TEXT DEFAULT '',
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  color VARCHAR(50),
  icon VARCHAR(50),
  owner_id UUID REFERENCES auth.users NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create file_versions table for versioning
CREATE TABLE IF NOT EXISTS file_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_id UUID REFERENCES files(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  url TEXT NOT NULL,
  size BIGINT,
  created_by UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  level VARCHAR(50),
  time_limit INTEGER, -- in seconds
  passing_score INTEGER DEFAULT 60,
  is_published BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- multiple_choice, true_false, fill_blank, audio, matching
  question TEXT NOT NULL,
  options JSONB, -- for multiple choice
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  points INTEGER DEFAULT 1,
  audio_url TEXT,
  image_url TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create quiz_attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users NOT NULL,
  score INTEGER NOT NULL,
  passed BOOLEAN DEFAULT FALSE,
  time_spent INTEGER, -- in seconds
  answers JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES auth.users NOT NULL,
  student_id UUID REFERENCES auth.users NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration INTEGER DEFAULT 60, -- in minutes
  type VARCHAR(50) DEFAULT 'individual', -- individual, group
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, cancelled, completed
  notes TEXT,
  meeting_url TEXT,
  price DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  type VARCHAR(50) NOT NULL, -- booking, message, achievement, sale, jam, system
  title VARCHAR(255) NOT NULL,
  message TEXT,
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  buyer_id UUID REFERENCES auth.users NOT NULL,
  seller_id UUID REFERENCES auth.users NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  payment_method VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, refunded
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies for files
CREATE POLICY "Users can view their own files" ON files
  FOR SELECT USING (auth.uid() = owner_id OR auth.uid() = ANY(shared_with));

CREATE POLICY "Users can insert their own files" ON files
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own files" ON files
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own files" ON files
  FOR DELETE USING (auth.uid() = owner_id);

-- RLS Policies for folders
CREATE POLICY "Users can view their own folders" ON folders
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can manage their own folders" ON folders
  FOR ALL USING (auth.uid() = owner_id);

-- RLS Policies for quizzes
CREATE POLICY "Anyone can view published quizzes" ON quizzes
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Teachers can manage their quizzes" ON quizzes
  FOR ALL USING (auth.uid() = created_by);

-- RLS Policies for quiz_questions
CREATE POLICY "Anyone can view questions of published quizzes" ON quiz_questions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM quizzes WHERE quizzes.id = quiz_questions.quiz_id AND quizzes.is_published = TRUE)
  );

-- RLS Policies for quiz_attempts
CREATE POLICY "Users can view their own attempts" ON quiz_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own attempts" ON quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings" ON bookings
  FOR SELECT USING (auth.uid() = teacher_id OR auth.uid() = student_id);

CREATE POLICY "Students can create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Teachers can update their bookings" ON bookings
  FOR UPDATE USING (auth.uid() = teacher_id);

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for purchases
CREATE POLICY "Users can view their own purchases" ON purchases
  FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Users can create purchases" ON purchases
  FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_files_owner ON files(owner_id);
CREATE INDEX IF NOT EXISTS idx_files_module ON files(module_id);
CREATE INDEX IF NOT EXISTS idx_files_path ON files(path);
CREATE INDEX IF NOT EXISTS idx_folders_owner ON folders(owner_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_module ON quizzes(module_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_teacher ON bookings(teacher_id);
CREATE INDEX IF NOT EXISTS idx_bookings_student ON bookings(student_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_buyer ON purchases(buyer_id);
CREATE INDEX IF NOT EXISTS idx_purchases_seller ON purchases(seller_id);

-- Function to increment product sales
CREATE OR REPLACE FUNCTION increment_product_sales(product_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE products SET sales_count = sales_count + 1 WHERE id = product_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- SQL Setup Script for Sahida's Birthday Project
-- Run this in your Supabase SQL Editor
-- ==============================================================================

-- 1. Create the quiz_answers table
CREATE TABLE IF NOT EXISTS public.quiz_answers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID DEFAULT gen_random_uuid(), -- Used to group answers from the same quiz attempt
    question_index INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    answer_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;

-- 3. Create policies to allow public (anon) access for this personal project
-- Allow inserting new answers
CREATE POLICY "Allow anonymous inserts" ON public.quiz_answers
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow reading answers (for the admin dashboard)
CREATE POLICY "Allow anonymous selects" ON public.quiz_answers
    FOR SELECT
    TO anon
    USING (true);

-- 4. Enable Realtime updates for the quiz_answers table
-- This allows our Admin Dashboard to listen to changes instantly.
BEGIN;
  -- Remove it first if it exists to prevent errors
  ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS public.quiz_answers;
  -- Add the table to the realtime publication
  ALTER PUBLICATION supabase_realtime ADD TABLE public.quiz_answers;
COMMIT;

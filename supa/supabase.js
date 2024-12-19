import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://bzkjcvxpxqowykqhomub.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6a2pjdnhweHFvd3lrcWhvbXViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3ODg1MTIsImV4cCI6MjA0OTM2NDUxMn0.kwfvdvq2j8U9t_M18NfLVYtfW9_rAWCx4e4qrFgSMz0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
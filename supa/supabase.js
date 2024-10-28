import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://swnloxsknktfmqjrgcar.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3bmxveHNrbmt0Zm1xanJnY2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3OTg2MjIsImV4cCI6MjA0NTM3NDYyMn0.TdVsqRuhTgYXD5jbF0KFPnQ0TrmtUhWtWTmBKwfipSw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
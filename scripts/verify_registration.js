const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tyirwgduknjslanazvlv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5aXJ3Z2R1a25qc2xhbmF6dmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NzA0MDIsImV4cCI6MjA3OTI0NjQwMn0.zV4c65WmxytbUcSKw1px-BPA6T6RXpshNL-JvmgUU-s';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyRegistration() {
  const randomEmail = `test_friend_${Date.now()}@example.com`;
  console.log(`Testing registration with: ${randomEmail}`);
  
  const { data, error } = await supabase.auth.signUp({
    email: randomEmail,
    password: 'Password123!',
    options: { data: { full_name: 'Test Friend' } }
  });

  if (error) {
    console.error('REGISTRATION FAILED:', error.message);
  } else {
    if (data.session) {
        console.log('SUCCESS: Session received immediately. Email confirmation is DISABLED (Good for testing).');
    } else {
        console.log('WARNING: Session IS NULL. Email confirmation is ENABLED. The friend will get stuck if they cant click the email link.');
    }
  }
}

verifyRegistration();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tyirwgduknjslanazvlv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5aXJ3Z2R1a25qc2xhbmF6dmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NzA0MDIsImV4cCI6MjA3OTI0NjQwMn0.zV4c65WmxytbUcSKw1px-BPA6T6RXpshNL-JvmgUU-s';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogin() {
  console.log('Testing login for: mveretakudzwa@proton.me');
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'mveretakudzwa@proton.me',
    password: 'th3w1s31',
  });

  if (error) {
    console.error('LOGIN FAILED:', error.message);
    if (error.message.includes('Email not confirmed')) {
        console.log('\nDIAGNOSIS: The account exists but is waiting for email verification.');
    }
  } else {
    console.log('LOGIN SUCCESS! Token received.');
  }
}

testLogin();

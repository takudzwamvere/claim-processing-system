const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tyirwgduknjslanazvlv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5aXJ3Z2R1a25qc2xhbmF6dmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NzA0MDIsImV4cCI6MjA3OTI0NjQwMn0.zV4c65WmxytbUcSKw1px-BPA6T6RXpshNL-JvmgUU-s';

// Note: In Node.js environment, we don't need the AsyncStorage config used in the app
const supabase = createClient(supabaseUrl, supabaseKey);

async function createUser() {
  console.log('Attempting to create user: mveretakudzwa@proton.me');
  
  const { data, error } = await supabase.auth.signUp({
    email: 'mveretakudzwa@proton.me',
    password: 'th3w1s31',
    options: {
      data: {
        full_name: 'Takudzwa Mvere'
      }
    }
  });

  if (error) {
    console.error('SERVER RESPONSE ERROR:', error.message);
  } else {
    console.log('User creation attempt finished.');
    if (data.user && !data.session) {
         console.log('STATUS: User created, but email not confirmed. (Session is null)');
    } else if (data.session) {
         console.log('STATUS: SUCCESS! User created and logged in.');
    }
  }
}

createUser();

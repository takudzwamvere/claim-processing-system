const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tyirwgduknjslanazvlv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5aXJ3Z2R1a25qc2xhbmF6dmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NzA0MDIsImV4cCI6MjA3OTI0NjQwMn0.zV4c65WmxytbUcSKw1px-BPA6T6RXpshNL-JvmgUU-s';

const supabase = createClient(supabaseUrl, supabaseKey);

const DUMMY_CLAIMS = [
  { provider: 'Parirenyatwa Hospital', amount: '$245.00', date: '2024-11-25', status: 'Approved' },
  { provider: 'Dr. Chikwende', amount: '$85.00', date: '2024-11-20', status: 'In Review' },
  { provider: 'MedLabs Zimbabwe', amount: '$120.00', date: '2024-11-18', status: 'Pending' },
  { provider: 'Avenues Clinic', amount: '$540.00', date: '2024-10-15', status: 'Approved' },
  { provider: 'Lancet Laboratories', amount: '$65.00', date: '2024-10-10', status: 'Rejected' },
];

async function seedData() {
  console.log('Logging in...');
  const { data: { user }, error: loginError } = await supabase.auth.signInWithPassword({
    email: 'mveretakudzwa@proton.me',
    password: 'th3w1s31',
  });

  if (loginError) {
    console.error('Login failed:', loginError.message);
    return;
  }

  console.log('Seeding data for user:', user.id);

  for (const claim of DUMMY_CLAIMS) {
    const { error } = await supabase.from('claims').insert({
      user_id: user.id,
      ...claim // provider, amount, date, status
    });
    
    if (error) console.error('Error inserting claim:', error.message);
    else console.log(`Inserted claim: ${claim.provider}`);
  }

  console.log('Seeding complete!');
}

seedData();

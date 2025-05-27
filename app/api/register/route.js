export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fullName, email, phone, username, password, paymentVerified } = req.body;

  if (!paymentVerified) {
    return res.status(400).json({ success: false, message: 'Payment not verified' });
  }

  try {
    // user registration logic here
    // Save user to database
    
    res.status(200).json({ success: true, message: 'Registration successful' });
  } catch{
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
}
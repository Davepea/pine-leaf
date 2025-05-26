import https from 'https';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { reference } = req.body;
  const secret_key = 'sk_test_your_paystack_secret_key'; 

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: `/transaction/verify/${reference}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${secret_key}`
    }
  };

  const paystackReq = https.request(options, (paystackRes) => {
    let data = '';
    paystackRes.on('data', (chunk) => {
      data += chunk;
    });
    
    paystackRes.on('end', () => {
      const response = JSON.parse(data);
      if (response.data.status === 'success') {
        res.status(200).json({ success: true, data: response.data });
      } else {
        res.status(400).json({ success: false, message: 'Payment verification failed' });
      }
    });
  });

  paystackReq.on('error', () => {
    res.status(500).json({ success: false, message: 'Verification error' });
  });

  paystackReq.end();
}
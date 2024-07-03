import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { method, body, headers } = req;

  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers you need to pass to LeetCode API
      },
      
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust this to your domain in production
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error proxying request to LeetCode' });
  }
}
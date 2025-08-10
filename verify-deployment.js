const https = require('https');

const BASE_URL = 'https://strades-backend.onrender.com';

function makeRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'strades-backend.onrender.com',
      port: 443,
      path: endpoint,
      method: 'GET',
      headers: {
        'User-Agent': 'Deployment-Verifier'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(data),
            endpoint: endpoint
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data,
            endpoint: endpoint
          });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function verifyDeployment() {
  console.log('🔍 Verifying Render Deployment...\n');
  
  const endpoints = ['/', '/health', '/test-metaapi'];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Testing: ${endpoint}`);
      const result = await makeRequest(endpoint);
      console.log(`Status: ${result.status}`);
      console.log(`Response: ${JSON.stringify(result.data, null, 2)}`);
      console.log('---');
    } catch (error) {
      console.log(`Error testing ${endpoint}: ${error.message}`);
      console.log('---');
    }
  }
  
  console.log('✅ Verification complete!');
  console.log('\n📋 Next Steps:');
  console.log('1. If endpoints are missing, wait 2-3 minutes for deployment to complete');
  console.log('2. Check Render dashboard for deployment status');
  console.log('3. If issues persist, check Render logs for errors');
}

verifyDeployment();

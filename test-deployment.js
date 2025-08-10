const https = require('https');

const BASE_URL = 'https://strades-backend.onrender.com';

// Test function
function testEndpoint(endpoint, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, BASE_URL);
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'MT4/MT5-Backend-Test'
      }
    };

    if (data) {
      const postData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({
            status: res.statusCode,
            data: parsed,
            headers: res.headers
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: responseData,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Run tests
async function runDeploymentTests() {
  console.log('🚀 Testing MT4/MT5 Backend Deployment on Render...\n');
  
  const tests = [
    {
      name: 'Root Endpoint (/)',
      endpoint: '/',
      method: 'GET'
    },
    {
      name: 'Health Check (/health)',
      endpoint: '/health',
      method: 'GET'
    },
    {
      name: 'MetaAPI Test (/test-metaapi)',
      endpoint: '/test-metaapi',
      method: 'GET'
    },
    {
      name: 'Connect Endpoint (/connect) - Test with dummy data',
      endpoint: '/connect',
      method: 'POST',
      data: {
        login: '12345',
        password: 'testpassword',
        server: 'test.server.com'
      }
    }
  ];

  for (const test of tests) {
    try {
      console.log(`📋 Testing: ${test.name}`);
      const result = await testEndpoint(test.endpoint, test.method, test.data);
      
      if (result.status === 200) {
        console.log(`✅ SUCCESS (${result.status}): ${test.name}`);
        console.log(`   Response:`, JSON.stringify(result.data, null, 2));
      } else {
        console.log(`⚠️  WARNING (${result.status}): ${test.name}`);
        console.log(`   Response:`, JSON.stringify(result.data, null, 2));
      }
    } catch (error) {
      console.log(`❌ ERROR: ${test.name}`);
      console.log(`   Error: ${error.message}`);
    }
    
    console.log(''); // Empty line for readability
  }

  console.log('🎯 Deployment Test Summary:');
  console.log(`   Base URL: ${BASE_URL}`);
  console.log(`   Available Endpoints:`);
  console.log(`   - GET  / (Root)`);
  console.log(`   - GET  /health (Health Check)`);
  console.log(`   - GET  /test-metaapi (MetaAPI Test)`);
  console.log(`   - POST /connect (Connect Account)`);
  console.log(`   - GET  /account/:id (Get Account Data)`);
  console.log(`   - DELETE /disconnect/:id (Disconnect Account)`);
  console.log(`   - GET  /connections (List Connections)`);
}

// Run the tests
runDeploymentTests().catch(console.error);

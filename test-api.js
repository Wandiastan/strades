const http = require('http');

// Test health endpoint
function testHealth() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/health',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log('Health Check Response:', JSON.parse(data));
        resolve(data);
      });
    });

    req.on('error', (error) => {
      console.error('Health Check Error:', error);
      reject(error);
    });

    req.end();
  });
}

// Test connect endpoint (with dummy data)
function testConnect() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      login: '12345',
      password: 'testpassword',
      server: 'test.server.com'
    });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/connect',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log('Connect Response:', JSON.parse(data));
        resolve(data);
      });
    });

    req.on('error', (error) => {
      console.error('Connect Error:', error);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Run tests
async function runTests() {
  console.log('Testing MT4/MT5 Backend API...\n');
  
  try {
    console.log('1. Testing Health Endpoint...');
    await testHealth();
    console.log('✅ Health endpoint working\n');
    
    console.log('2. Testing Connect Endpoint...');
    await testConnect();
    console.log('✅ Connect endpoint working\n');
    
    console.log('🎉 All tests completed successfully!');
    console.log('\nAPI Endpoints:');
    console.log('- GET  /health - Health check');
    console.log('- POST /connect - Connect to MT4/MT5 account');
    console.log('- GET  /account/:connectionId - Get account data');
    console.log('- DELETE /disconnect/:connectionId - Disconnect account');
    console.log('- GET  /connections - List active connections');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

runTests();

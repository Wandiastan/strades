const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MetaApi = require('metaapi.cloud-sdk').default;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MetaAPI configuration
const META_API_TOKEN = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJlZjRiMjVkZTJmYWIwMGMxYzU1NmFjNTI4NGFiOGIyMCIsImFjY2Vzc1J1bGVzIjpbeyJpZCI6InRyYWRpbmctYWNjb3VudC1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcmVzdC1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcnBjLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcmVhbC10aW1lLXN0cmVhbWluZy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJtZXRhc3RhdHMtYXBpIiwibWV0aG9kcyI6WyJtZXRhc3RhdHMtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6InJpc2stbWFuYWdlbWVudC1hcGkiLCJtZXRob2RzIjpbInJpc2stbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoiY29weWZhY3RvcnktYXBpIiwibWV0aG9kcyI6WyJjb3B5ZmFjdG9yeS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibXQtbWFuYWdlci1hcGkiLCJtZXRob2RzIjpbIm10LW1hbmFnZXItYXBpOnJlc3Q6ZGVhbGluZzoqOioiLCJtdC1tYW5hZ2VyLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJiaWxsaW5nLWFwaSIsIm1ldGhvZHMiOlsiYmlsbGluZy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfV0sImlnbm9yZVJhdGVMaW1pdHMiOmZhbHNlLCJ0b2tlbklkIjoiMjAyMTAyMTMiLCJpbXBlcnNvbmF0ZWQiOmZhbHNlLCJyZWFsVXNlcklkIjoiZWY0YjI1ZGUyZmFiMDBjMWM1NTZhYzUyODRhYjhiMjAiLCJpYXQiOjE3NTQ3Mjc0Nzl9.RA64frs-d57CsuRkVNR9Zyb0xNDRbBO8H2OHKcbiJvuKHEQCQeNBLHLWunMkOcmmacbHpAUVRgIm_z0_YvUkE-NA3sT-BiPik2grEKblgAWL-kDFn2MPpaU4sbdWHUcVhvb74qVcT92AhSmJoBjS94L2K8Zs-q-BAqxhg77kJ086ljutY8vItcixruKu4rO2TyQwKo14WO0Ydy5f-dS9N0kpnGDW-0HEuI6QVgV69AqLZ3IkyQpxknBSpnGP3nJsnLsfNb1oFwKZCRSJu7bS9ElboYGmjzy-dbKwDC5voa6tirAqzZ-WAt9q04qNr9nxrxKW81FfvND9dW-0S8Ch6wJHFdYVbTjSNkO2avdOwbj91X2AeaVr8xktJ11zytyf6Venya2kea9_wuR3g5RQU2jWrra-4P4LtKFajl6BmcjTyYjlTPVY6ik4654TMPoL8ERGmsAMZO63PJ5TT7knAIKwsNsBI2ItWG3iAShY1Bg1UxUWUr3DKOidvHX4WmACfLyDTzq4jKCZfnHadHmjlbI8DFD6jD4xe3KhcdJfIhfM7k1TkP8V4pD595ar4qnmHncX2SOzfYZu4MkoZDEoPUpvXPAJW5b-BS68_U52qYYlF4Z8CP1PCbm448HMTgUL2kiqHDpiXP9x0Xej0xWVV2swEE-Q4QdLk1QewA9Gqe4';

const metaApi = new MetaApi(META_API_TOKEN);

// Store active connections
const activeConnections = new Map();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'MT4/MT5 Backend Server is running' });
});

// Connect to MT4/MT5 account
app.post('/connect', async (req, res) => {
  try {
    const { login, password, server } = req.body;

    // Validate input
    if (!login || !password || !server) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: login, password, server'
      });
    }

    console.log(`Attempting to connect to account: ${login} on server: ${server}`);

    // Create connection configuration
    const connectionConfig = {
      accountId: login,
      password: password,
      server: server,
      type: 'cloud' // Use cloud connection
    };

    // Create connection
    const connection = await metaApi.metatraderAccountApi.createAccount(connectionConfig);
    
    // Wait for connection to be deployed
    await connection.waitDeployed();
    
    // Wait for connection to be connected
    await connection.waitConnected();

    // Get account information
    const accountInfo = await connection.getAccountInformation();
    
    // Get positions
    const positions = await connection.getPositions();
    
    // Get orders
    const orders = await connection.getOrders();
    
    // Get trades history (last 100 trades)
    const trades = await connection.getDealsByDateRange(
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      new Date()
    );

    // Store connection for later use
    const connectionId = `${login}_${server}`;
    activeConnections.set(connectionId, {
      connection,
      accountInfo,
      lastUpdated: new Date()
    });

    // Prepare response data
    const responseData = {
      success: true,
      connectionId,
      account: {
        login: accountInfo.login,
        server: accountInfo.server,
        balance: accountInfo.balance,
        equity: accountInfo.equity,
        margin: accountInfo.margin,
        freeMargin: accountInfo.freeMargin,
        profit: accountInfo.profit,
        currency: accountInfo.currency,
        leverage: accountInfo.leverage,
        type: accountInfo.type
      },
      positions: positions.map(pos => ({
        id: pos.id,
        symbol: pos.symbol,
        type: pos.type,
        volume: pos.volume,
        openPrice: pos.openPrice,
        currentPrice: pos.currentPrice,
        profit: pos.profit,
        swap: pos.swap,
        time: pos.time
      })),
      orders: orders.map(ord => ({
        id: ord.id,
        symbol: ord.symbol,
        type: ord.type,
        volume: ord.volume,
        price: ord.price,
        stopLoss: ord.stopLoss,
        takeProfit: ord.takeProfit,
        time: ord.time
      })),
      trades: trades.slice(-100).map(trade => ({
        id: trade.id,
        symbol: trade.symbol,
        type: trade.type,
        volume: trade.volume,
        price: trade.price,
        profit: trade.profit,
        swap: trade.swap,
        time: trade.time
      }))
    };

    res.json(responseData);

  } catch (error) {
    console.error('Connection error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to connect to MT4/MT5 account'
    });
  }
});

// Get account data (refresh)
app.get('/account/:connectionId', async (req, res) => {
  try {
    const { connectionId } = req.params;
    
    const connectionData = activeConnections.get(connectionId);
    if (!connectionData) {
      return res.status(404).json({
        success: false,
        error: 'Connection not found'
      });
    }

    const { connection } = connectionData;

    // Get updated account information
    const accountInfo = await connection.getAccountInformation();
    const positions = await connection.getPositions();
    const orders = await connection.getOrders();

    // Update stored data
    activeConnections.set(connectionId, {
      ...connectionData,
      accountInfo,
      lastUpdated: new Date()
    });

    res.json({
      success: true,
      account: {
        login: accountInfo.login,
        server: accountInfo.server,
        balance: accountInfo.balance,
        equity: accountInfo.equity,
        margin: accountInfo.margin,
        freeMargin: accountInfo.freeMargin,
        profit: accountInfo.profit,
        currency: accountInfo.currency,
        leverage: accountInfo.leverage,
        type: accountInfo.type
      },
      positions: positions.map(pos => ({
        id: pos.id,
        symbol: pos.symbol,
        type: pos.type,
        volume: pos.volume,
        openPrice: pos.openPrice,
        currentPrice: pos.currentPrice,
        profit: pos.profit,
        swap: pos.swap,
        time: pos.time
      })),
      orders: orders.map(ord => ({
        id: ord.id,
        symbol: ord.symbol,
        type: ord.type,
        volume: ord.volume,
        price: ord.price,
        stopLoss: ord.stopLoss,
        takeProfit: ord.takeProfit,
        time: ord.time
      }))
    });

  } catch (error) {
    console.error('Error fetching account data:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch account data'
    });
  }
});

// Disconnect account
app.delete('/disconnect/:connectionId', async (req, res) => {
  try {
    const { connectionId } = req.params;
    
    const connectionData = activeConnections.get(connectionId);
    if (!connectionData) {
      return res.status(404).json({
        success: false,
        error: 'Connection not found'
      });
    }

    // Disconnect the connection
    await connectionData.connection.disconnect();
    
    // Remove from active connections
    activeConnections.delete(connectionId);

    res.json({
      success: true,
      message: 'Account disconnected successfully'
    });

  } catch (error) {
    console.error('Error disconnecting account:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to disconnect account'
    });
  }
});

// Get all active connections
app.get('/connections', (req, res) => {
  const connections = Array.from(activeConnections.keys()).map(connectionId => {
    const data = activeConnections.get(connectionId);
    return {
      connectionId,
      login: data.accountInfo.login,
      server: data.accountInfo.server,
      lastUpdated: data.lastUpdated
    };
  });

  res.json({
    success: true,
    connections
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`MT4/MT5 Backend Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  
  // Disconnect all active connections
  for (const [connectionId, connectionData] of activeConnections) {
    try {
      await connectionData.connection.disconnect();
      console.log(`Disconnected: ${connectionId}`);
    } catch (error) {
      console.error(`Error disconnecting ${connectionId}:`, error);
    }
  }
  
  process.exit(0);
});

# MT4/MT5 Backend Server

A Node.js backend server that connects to MT4/MT5 trading accounts using MetaAPI.cloud. This server provides REST API endpoints for connecting to trading accounts, fetching account data, positions, orders, and trade history.

## Features

- 🔗 **MT4/MT5 Account Connection** - Connect to trading accounts using MetaAPI.cloud
- 📊 **Account Information** - Fetch balance, equity, margin, profit, and other account details
- 📈 **Positions & Orders** - Get current open positions and pending orders
- 📋 **Trade History** - Retrieve historical trades and deals
- 🔄 **Real-time Updates** - Refresh account data on demand
- 🚪 **Connection Management** - Connect and disconnect accounts as needed

## Prerequisites

- Node.js (v14 or higher)
- MetaAPI.cloud account and API token
- MT4/MT5 trading account credentials

## Installation

1. **Clone or download the backend folder**
2. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Configure MetaAPI Token:**
   - The server is pre-configured with a MetaAPI token
   - For production, consider using environment variables

## Usage

### Start the Server

```bash
npm start
```

The server will start on port 3000 (or the port specified in the PORT environment variable).

### Development Mode

```bash
npm run dev
```

This will start the server with nodemon for automatic restarts during development.

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and confirms the API is running.

**Response:**
```json
{
  "status": "OK",
  "message": "MT4/MT5 Backend Server is running"
}
```

### Connect to MT4/MT5 Account
```
POST /connect
```

**Request Body:**
```json
{
  "login": "your_account_number",
  "password": "your_investor_password",
  "server": "your_broker_server"
}
```

**Response:**
```json
{
  "success": true,
  "connectionId": "account_server",
  "account": {
    "login": "12345",
    "server": "broker.server.com",
    "balance": 10000.00,
    "equity": 10050.00,
    "margin": 500.00,
    "freeMargin": 9550.00,
    "profit": 50.00,
    "currency": "USD",
    "leverage": 100,
    "type": "REAL"
  },
  "positions": [...],
  "orders": [...],
  "trades": [...]
}
```

### Get Account Data
```
GET /account/:connectionId
```
Refreshes and returns current account data for an active connection.

### Disconnect Account
```
DELETE /disconnect/:connectionId
```
Disconnects and removes an active account connection.

### List Active Connections
```
GET /connections
```
Returns a list of all currently active account connections.

## Deployment to Render

### 1. Prepare for Deployment

The server is already configured for Render deployment with:
- Dynamic port binding (`process.env.PORT`)
- CORS enabled for cross-origin requests
- Graceful shutdown handling

### 2. Deploy to Render

1. **Create a new Web Service on Render**
2. **Connect your repository** (or upload the backend folder)
3. **Configure the service:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node

### 3. Environment Variables (Optional)

For production, consider setting these environment variables:
- `PORT` - Server port (Render will set this automatically)
- `META_API_TOKEN` - Your MetaAPI token (currently hardcoded)

## MetaAPI Configuration

The server uses MetaAPI.cloud for MT4/MT5 connections. The current configuration includes:

- **API Token:** Pre-configured with a valid token
- **Connection Type:** Cloud-based connections
- **Features:** Account management, position tracking, order management, trade history

### Required Account Information

When connecting to an MT4/MT5 account, you need:
- **Login/Account ID:** Your trading account number
- **Password:** Investor/read-only password (not the main trading password)
- **Server:** Your broker's MT4/MT5 server address

## Error Handling

The API includes comprehensive error handling:
- Input validation for required fields
- MetaAPI connection error handling
- Graceful error responses with meaningful messages
- Proper HTTP status codes

## Security Considerations

- The server uses CORS for cross-origin requests
- Passwords are not stored permanently (only during active connections)
- Consider implementing authentication for production use
- Use HTTPS in production environments

## Testing

Run the included test script to verify API functionality:

```bash
node test-api.js
```

This will test the health endpoint and attempt a connection (with dummy data).

## File Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── test-api.js        # API testing script
└── README.md          # This documentation
```

## Support

For issues related to:
- **MetaAPI.cloud:** Check their documentation and support
- **MT4/MT5 connections:** Contact your broker
- **Server deployment:** Check Render's documentation

## License

MIT License - Feel free to use and modify as needed.

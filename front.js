<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MT4/MT5 Trading Account Manager</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            color: white;
        }

        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }

        .card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }

        .card:hover {
            transform: translateY(-5px);
        }

        .card h2 {
            color: #4a5568;
            margin-bottom: 20px;
            font-size: 1.5rem;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 10px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #4a5568;
        }

        .form-group input {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }

        .form-group input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-right: 10px;
            margin-bottom: 10px;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .btn-secondary {
            background: #718096;
        }

        .btn-danger {
            background: #e53e3e;
        }

        .btn-success {
            background: #38a169;
        }

        .status {
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-weight: 500;
        }

        .status.success {
            background: #c6f6d5;
            color: #22543d;
            border: 1px solid #9ae6b4;
        }

        .status.error {
            background: #fed7d7;
            color: #742a2a;
            border: 1px solid #feb2b2;
        }

        .status.info {
            background: #bee3f8;
            color: #2a4365;
            border: 1px solid #90cdf4;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .account-info {
            background: #f7fafc;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }

        .account-info h3 {
            color: #4a5568;
            margin-bottom: 15px;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
        }

        .info-row:last-child {
            border-bottom: none;
        }

        .info-label {
            font-weight: 600;
            color: #4a5568;
        }

        .info-value {
            color: #2d3748;
        }

        .positions-table, .orders-table, .trades-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        .positions-table th, .positions-table td,
        .orders-table th, .orders-table td,
        .trades-table th, .trades-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }

        .positions-table th, .orders-table th, .trades-table th {
            background: #f7fafc;
            font-weight: 600;
            color: #4a5568;
        }

        .profit-positive {
            color: #38a169;
            font-weight: 600;
        }

        .profit-negative {
            color: #e53e3e;
            font-weight: 600;
        }

        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 10px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .hidden {
            display: none;
        }

        .connections-list {
            list-style: none;
        }

        .connections-list li {
            background: #f7fafc;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .connection-info {
            flex: 1;
        }

        .connection-actions {
            display: flex;
            gap: 10px;
        }

        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .grid {
                grid-template-columns: 1fr;
            }
            
            .btn {
                width: 100%;
                margin-right: 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 MT4/MT5 Trading Account Manager</h1>
            <p>Connect and manage your MetaTrader accounts with ease</p>
        </div>

        <!-- Connection Form -->
        <div class="card">
            <h2>🔗 Connect to MT4/MT5 Account</h2>
            <form id="connectionForm">
                <div class="form-group">
                    <label for="login">Account Number (Login ID)</label>
                    <input type="text" id="login" name="login" placeholder="Enter your account number" required>
                </div>
                <div class="form-group">
                    <label for="password">Investor Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your investor password" required>
                </div>
                <div class="form-group">
                    <label for="server">Broker Server</label>
                    <input type="text" id="server" name="server" placeholder="e.g., broker.server.com" required>
                </div>
                <button type="submit" class="btn" id="connectBtn">
                    <span class="loading hidden" id="connectLoading"></span>
                    Connect Account
                </button>
            </form>
        </div>

        <!-- Status Messages -->
        <div id="statusContainer"></div>

        <!-- Account Information -->
        <div id="accountInfo" class="card hidden">
            <h2>📊 Account Information</h2>
            <div id="accountDetails" class="account-info"></div>
        </div>

        <!-- Positions -->
        <div id="positionsCard" class="card hidden">
            <h2>📈 Open Positions</h2>
            <div id="positionsContainer"></div>
        </div>

        <!-- Orders -->
        <div id="ordersCard" class="card hidden">
            <h2>📋 Pending Orders</h2>
            <div id="ordersContainer"></div>
        </div>

        <!-- Trade History -->
        <div id="tradesCard" class="card hidden">
            <h2>📚 Trade History</h2>
            <div id="tradesContainer"></div>
        </div>

        <!-- Active Connections -->
        <div class="card">
            <h2>🔌 Active Connections</h2>
            <button class="btn btn-secondary" onclick="refreshConnections()">Refresh Connections</button>
            <div id="connectionsContainer"></div>
        </div>

        <!-- API Status -->
        <div class="card">
            <h2>🔍 API Status</h2>
            <button class="btn btn-secondary" onclick="checkHealth()">Check Health</button>
            <button class="btn btn-secondary" onclick="testMetaAPI()">Test MetaAPI</button>
            <div id="apiStatus"></div>
        </div>
    </div>

    <script>
        // Configuration
        const API_BASE_URL = 'https://strades-backend.onrender.com';
        let currentConnectionId = null;

        // Utility functions
        function showStatus(message, type = 'info') {
            const statusContainer = document.getElementById('statusContainer');
            const statusDiv = document.createElement('div');
            statusDiv.className = `status ${type}`;
            statusDiv.textContent = message;
            statusContainer.appendChild(statusDiv);
            
            setTimeout(() => {
                statusDiv.remove();
            }, 5000);
        }

        function formatCurrency(amount, currency = 'USD') {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency
            }).format(amount);
        }

        function formatDate(dateString) {
            return new Date(dateString).toLocaleString();
        }

        function formatProfit(profit) {
            const formatted = formatCurrency(Math.abs(profit));
            return profit >= 0 ? `+${formatted}` : `-${formatted}`;
        }

        function getProfitClass(profit) {
            return profit >= 0 ? 'profit-positive' : 'profit-negative';
        }

        // API Functions
        async function makeRequest(endpoint, options = {}) {
            try {
                const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    },
                    ...options
                });
                
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || `HTTP ${response.status}`);
                }
                
                return data;
            } catch (error) {
                throw new Error(`API Error: ${error.message}`);
            }
        }

        // Health Check
        async function checkHealth() {
            try {
                const data = await makeRequest('/health');
                document.getElementById('apiStatus').innerHTML = `
                    <div class="status success">
                        ✅ Health Check: ${data.message}<br>
                        Timestamp: ${data.timestamp}<br>
                        MetaAPI: ${data.metaApi}
                    </div>
                `;
            } catch (error) {
                document.getElementById('apiStatus').innerHTML = `
                    <div class="status error">
                        ❌ Health Check Failed: ${error.message}
                    </div>
                `;
            }
        }

        // Test MetaAPI
        async function testMetaAPI() {
            try {
                const data = await makeRequest('/test-metaapi');
                document.getElementById('apiStatus').innerHTML = `
                    <div class="status success">
                        ✅ MetaAPI Test: ${data.message}<br>
                        Status: ${data.status}<br>
                        Timestamp: ${data.timestamp}
                    </div>
                `;
            } catch (error) {
                document.getElementById('apiStatus').innerHTML = `
                    <div class="status error">
                        ❌ MetaAPI Test Failed: ${error.message}
                    </div>
                `;
            }
        }

        // Connect to Account
        async function connectAccount(formData) {
            try {
                const data = await makeRequest('/connect', {
                    method: 'POST',
                    body: JSON.stringify(formData)
                });

                if (data.success) {
                    currentConnectionId = data.connectionId;
                    showStatus('✅ Account connected successfully!', 'success');
                    displayAccountData(data);
                    refreshConnections();
                } else {
                    throw new Error(data.error);
                }
            } catch (error) {
                showStatus(`❌ Connection failed: ${error.message}`, 'error');
            }
        }

        // Display Account Data
        function displayAccountData(data) {
            // Account Information
            const accountDetails = document.getElementById('accountDetails');
            accountDetails.innerHTML = `
                <h3>Account Details</h3>
                <div class="info-row">
                    <span class="info-label">Login:</span>
                    <span class="info-value">${data.account.login}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Server:</span>
                    <span class="info-value">${data.account.server}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Balance:</span>
                    <span class="info-value">${formatCurrency(data.account.balance, data.account.currency)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Equity:</span>
                    <span class="info-value">${formatCurrency(data.account.equity, data.account.currency)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Margin:</span>
                    <span class="info-value">${formatCurrency(data.account.margin, data.account.currency)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Free Margin:</span>
                    <span class="info-value">${formatCurrency(data.account.freeMargin, data.account.currency)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Profit:</span>
                    <span class="info-value ${getProfitClass(data.account.profit)}">${formatProfit(data.account.profit)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Currency:</span>
                    <span class="info-value">${data.account.currency}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Leverage:</span>
                    <span class="info-value">1:${data.account.leverage}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Account Type:</span>
                    <span class="info-value">${data.account.type}</span>
                </div>
            `;
            document.getElementById('accountInfo').classList.remove('hidden');

            // Positions
            if (data.positions && data.positions.length > 0) {
                displayPositions(data.positions);
            } else {
                document.getElementById('positionsCard').classList.add('hidden');
            }

            // Orders
            if (data.orders && data.orders.length > 0) {
                displayOrders(data.orders);
            } else {
                document.getElementById('ordersCard').classList.add('hidden');
            }

            // Trades
            if (data.trades && data.trades.length > 0) {
                displayTrades(data.trades);
            } else {
                document.getElementById('tradesCard').classList.add('hidden');
            }
        }

        // Display Positions
        function displayPositions(positions) {
            const container = document.getElementById('positionsContainer');
            container.innerHTML = `
                <table class="positions-table">
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Type</th>
                            <th>Volume</th>
                            <th>Open Price</th>
                            <th>Current Price</th>
                            <th>Profit</th>
                            <th>Swap</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${positions.map(pos => `
                            <tr>
                                <td>${pos.symbol}</td>
                                <td>${pos.type}</td>
                                <td>${pos.volume}</td>
                                <td>${pos.openPrice}</td>
                                <td>${pos.currentPrice}</td>
                                <td class="${getProfitClass(pos.profit)}">${formatProfit(pos.profit)}</td>
                                <td>${formatCurrency(pos.swap)}</td>
                                <td>${formatDate(pos.time)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            document.getElementById('positionsCard').classList.remove('hidden');
        }

        // Display Orders
        function displayOrders(orders) {
            const container = document.getElementById('ordersContainer');
            container.innerHTML = `
                <table class="orders-table">
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Type</th>
                            <th>Volume</th>
                            <th>Price</th>
                            <th>Stop Loss</th>
                            <th>Take Profit</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.map(ord => `
                            <tr>
                                <td>${ord.symbol}</td>
                                <td>${ord.type}</td>
                                <td>${ord.volume}</td>
                                <td>${ord.price}</td>
                                <td>${ord.stopLoss || '-'}</td>
                                <td>${ord.takeProfit || '-'}</td>
                                <td>${formatDate(ord.time)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            document.getElementById('ordersCard').classList.remove('hidden');
        }

        // Display Trades
        function displayTrades(trades) {
            const container = document.getElementById('tradesContainer');
            container.innerHTML = `
                <table class="trades-table">
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Type</th>
                            <th>Volume</th>
                            <th>Price</th>
                            <th>Profit</th>
                            <th>Swap</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${trades.map(trade => `
                            <tr>
                                <td>${trade.symbol}</td>
                                <td>${trade.type}</td>
                                <td>${trade.volume}</td>
                                <td>${trade.price}</td>
                                <td class="${getProfitClass(trade.profit)}">${formatProfit(trade.profit)}</td>
                                <td>${formatCurrency(trade.swap)}</td>
                                <td>${formatDate(trade.time)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            document.getElementById('tradesCard').classList.remove('hidden');
        }

        // Refresh Account Data
        async function refreshAccountData() {
            if (!currentConnectionId) return;
            
            try {
                const data = await makeRequest(`/account/${currentConnectionId}`);
                if (data.success) {
                    displayAccountData(data);
                    showStatus('✅ Account data refreshed', 'success');
                }
            } catch (error) {
                showStatus(`❌ Failed to refresh: ${error.message}`, 'error');
            }
        }

        // Disconnect Account
        async function disconnectAccount(connectionId) {
            try {
                await makeRequest(`/disconnect/${connectionId}`, {
                    method: 'DELETE'
                });
                
                if (connectionId === currentConnectionId) {
                    currentConnectionId = null;
                    document.getElementById('accountInfo').classList.add('hidden');
                    document.getElementById('positionsCard').classList.add('hidden');
                    document.getElementById('ordersCard').classList.add('hidden');
                    document.getElementById('tradesCard').classList.add('hidden');
                }
                
                showStatus('✅ Account disconnected successfully', 'success');
                refreshConnections();
            } catch (error) {
                showStatus(`❌ Disconnect failed: ${error.message}`, 'error');
            }
        }

        // Refresh Connections
        async function refreshConnections() {
            try {
                const data = await makeRequest('/connections');
                const container = document.getElementById('connectionsContainer');
                
                if (data.connections && data.connections.length > 0) {
                    container.innerHTML = `
                        <ul class="connections-list">
                            ${data.connections.map(conn => `
                                <li>
                                    <div class="connection-info">
                                        <strong>Login:</strong> ${conn.login}<br>
                                        <strong>Server:</strong> ${conn.server}<br>
                                        <strong>Last Updated:</strong> ${formatDate(conn.lastUpdated)}
                                    </div>
                                    <div class="connection-actions">
                                        <button class="btn btn-secondary" onclick="refreshAccountData()">Refresh</button>
                                        <button class="btn btn-danger" onclick="disconnectAccount('${conn.connectionId}')">Disconnect</button>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    `;
                } else {
                    container.innerHTML = '<p>No active connections</p>';
                }
            } catch (error) {
                document.getElementById('connectionsContainer').innerHTML = `
                    <div class="status error">Failed to load connections: ${error.message}</div>
                `;
            }
        }

        // Event Listeners
        document.getElementById('connectionForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                login: document.getElementById('login').value,
                password: document.getElementById('password').value,
                server: document.getElementById('server').value
            };

            const connectBtn = document.getElementById('connectBtn');
            const loading = document.getElementById('connectLoading');
            
            connectBtn.disabled = true;
            loading.classList.remove('hidden');
            
            try {
                await connectAccount(formData);
                document.getElementById('connectionForm').reset();
            } finally {
                connectBtn.disabled = false;
                loading.classList.add('hidden');
            }
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            checkHealth();
            refreshConnections();
        });
    </script>
</body>
</html>

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'SPEED server is running successfully.' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  });
});

// Start server with error handling
const server = app.listen(port, () => {
  console.log(`SPEED server is running on port ${port}`);
  console.log(`Visit http://localhost:${port} to test the server`);
  console.log(`Health check available at http://localhost:${port}/health`);
});

// Error handling for server startup
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please use a different port.`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('\nShutting down SPEED server gracefully...');
  server.close(() => {
    console.log('SPEED server has been stopped.');
    process.exit(0);
  });
});
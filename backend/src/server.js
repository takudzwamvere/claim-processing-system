const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/claims', require('./routes/claims'));

app.get('/', (req, res) => {
  res.json({ message: 'Claim Processing System API is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Start Blockchain Listener
  const startListener = require('./services/blockchainListener');
  startListener();
});

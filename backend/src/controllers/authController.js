const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { wallet } = require('../config/blockchain'); // Optional: Use server wallet to create user sub-wallets if needed, or simple key generation

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // 1. Check if user exists
    const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create Wallet (Simulated for individual users or actual generation)
    // For this prototype, we will just generate a random address if we aren't managing keys
    // In a real app, you might encrypt and store the private key, or let the user manage it.
    const ethers = require('ethers');
    const newWallet = ethers.Wallet.createRandom();
    
    const walletAddress = newWallet.address;
    // Note: We are NOT saving the private key securely here. 
    // In a real production system, do NOT save private keys in plain text.

    // 4. Save User
    // We assume a 'users' table exists. We need to create it in setupDatabase.js
    const newUser = await db.query(
      'INSERT INTO users (email, password_hash, role, wallet_address) VALUES ($1, $2, $3, $4) RETURNING id, email, role, wallet_address',
      [email, hashedPassword, role || 'patient', walletAddress]
    );

    // 5. Generate JWT
    const payload = {
      user: {
        id: newUser.rows[0].id,
        role: newUser.rows[0].role
      }
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '5d' },
        (err, token) => {
            if (err) throw err;
            res.json({ token, user: newUser.rows[0] });
        }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (userResult.rows.length === 0) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const user = userResult.rows[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const db = require('../config/database');
const { contract } = require('../config/blockchain');

exports.submitClaim = async (req, res) => {
    const { provider, amount, date, ipfsHash } = req.body;
    const userId = req.user.id; // From auth Middleware

    try {
        // 1. Generate a unique internal Claim Hash or ID
        // For simplicity, we use the timestamp + ID as a "hash" or assume IPFS hash is the unique identifier
        const claimHash = ipfsHash || `claim_${Date.now()}_${userId}`;
        const amountWei = amount; // In a real app, convert ether/currency to wei/units

        // 2. Submit to Blockchain
        let txHash = "0x_SIMULATED_IF_NO_CONNECTION";
        if (contract) {
            try {
                // Prepare transaction
                // Note: date should be unix timestamp
                const dateTimestamp = new Date(date).getTime();
                
                const tx = await contract.submitClaim(claimHash, provider, amountWei, dateTimestamp);
                console.log("Transaction sent:", tx.hash);
                
                // Wait for confirmation (optional, can do async)
                // await tx.wait();
                txHash = tx.hash;
            } catch (bcError) {
                console.error("Blockchain Error:", bcError);
                return res.status(500).json({ msg: "Blockchain submission failed", error: bcError.message });
            }
        } else {
             console.warn("Contract not connected. Skipping blockchain write.");
        }

        // 3. Save to Database
        const newClaim = await db.query(
            'INSERT INTO claims (user_id, provider, amount, date, status, ipfs_hash, claim_hash, tx_hash) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [userId, provider, amount, date, 'Pending', ipfsHash, claimHash, txHash]
        );

        res.json({ 
            msg: 'Claim Submitted', 
            claim: newClaim.rows[0],
            claimHash,
            txHash 
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getClaims = async (req, res) => {
    try {
        const userId = req.user.id;
        const claims = await db.query('SELECT * FROM claims WHERE user_id = $1 ORDER BY date DESC', [userId]);
        res.json(claims.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllClaims = async (req, res) => {
    // For validators/admin
    try {
        const claims = await db.query('SELECT * FROM claims ORDER BY date DESC');
        res.json(claims.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

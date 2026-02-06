const { contract } = require('../config/blockchain');
const db = require('../config/database');

const startListener = () => {
    if (!contract) {
        console.warn("Contract not initialized. Event listener disabled.");
        return;
    }

    console.log("Starting Blockchain Event Listener...");

    // Listen for ClaimSubmitted
    contract.on("ClaimSubmitted", async (claimHash, provider, amount, event) => {
        console.log(`Event Received: ClaimSubmitted - ${claimHash}`);
        // In a real app, you might update a "status" from "Submitting" to "Pending" 
        // if you had a granular state machine.
    });

    // Listen for ClaimValidated
    contract.on("ClaimValidated", async (claimHash, newStatus, event) => {
        console.log(`Event Received: ClaimValidated - ${claimHash}, Status: ${newStatus}`);

        try {
            // Update Database
            await db.query(
                `UPDATE claims SET status = $1 WHERE claim_hash = $2`, 
                [newStatus, claimHash]
            );

            // TODO: Create a notification record for the user
            // const claim = await db.query('SELECT user_id FROM claims WHERE claim_hash = $1', [claimHash]);
            // createNotification(claim.rows[0].user_id, `Your claim has been ${newStatus}`);

        } catch (err) {
            console.error("Error processing ClaimValidated event:", err);
        }
    });
};

module.exports = startListener;

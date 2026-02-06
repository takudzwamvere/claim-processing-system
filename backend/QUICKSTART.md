# QuickStart Guide - Backend

## Prerequisites

- Node.js (Installed)
- PostgreSQL (Installed & Running)

## 1. Configuration

1.  Navigate to `backend/`.
2.  Open `.env` and update:
    - `DATABASE_URL`: `postgres://<user>:<password>@localhost:5432/<dbname>`
    - `PRIVATE_KEY`: Your wallet private key (for deploying contracts).

## 2. Setup

Run the following commands in the `backend/` directory:

```bash
# Install dependencies (if not already done)
npm install

# Setup Database Tables
node scripts/setupDatabase.js

# Compile Smart Contracts
npx hardhat compile
```

## 3. Deploy Contract (Optional for Dev, Required for Blockchain)

To deploy to a local node (Hardhat Network):

```bash
npx hardhat node
# In a new terminal:
npx hardhat run scripts/deploy.js --network localhost
```

_Take the deployed address and put it in your `.env` as `CONTRACT_ADDRESS`._

## 4. Run Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

## 5. Testing

Use the provided `curl` commands in `API_DOCUMENTATION.md` (to be created) or Postman.

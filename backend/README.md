# Medical Claims Backend

This is the Node.js/Express backend for the Claim Processing System.

## Architecture

- **API**: Express.js
- **Database**: PostgreSQL
- **Blockchain**: Polygon (via Hardhat/Ethers.js)

## Setup

See [QUICKSTART.md](./QUICKSTART.md) for detailed setup instructions.

## Key Files

- `src/server.js`: Application Entry
- `contracts/ClaimProcessor.sol`: Smart Contract
- `src/services/blockchainListener.js`: Real-time event monitor

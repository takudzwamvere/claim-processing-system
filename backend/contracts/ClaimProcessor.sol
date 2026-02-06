// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ClaimProcessor {
    struct Claim {
        string claimHash; // IPFS or internal hash
        string provider;
        uint256 amount;
        uint256 date;
        string status; // "Pending", "In Review", "Approved", "Rejected"
        bool exists;
    }

    mapping(string => Claim) public claims;
    address public validator;

    event ClaimSubmitted(string indexed claimHash, string provider, uint256 amount);
    event ClaimValidated(string indexed claimHash, string newStatus);

    constructor() {
        validator = msg.sender;
    }

    modifier onlyValidator() {
        require(msg.sender == validator, "Only validator can perform this action");
        _;
    }

    function submitClaim(string memory _claimHash, string memory _provider, uint256 _amount, uint256 _date) public {
        require(!claims[_claimHash].exists, "Claim already exists");

        claims[_claimHash] = Claim({
            claimHash: _claimHash,
            provider: _provider,
            amount: _amount,
            date: _date,
            status: "Pending",
            exists: true
        });

        emit ClaimSubmitted(_claimHash, _provider, _amount);
    }

    function validateClaim(string memory _claimHash, string memory _newStatus) public onlyValidator {
        require(claims[_claimHash].exists, "Claim does not exist");
        
        claims[_claimHash].status = _newStatus;
        emit ClaimValidated(_claimHash, _newStatus);
    }

    function getClaim(string memory _claimHash) public view returns (Claim memory) {
        require(claims[_claimHash].exists, "Claim does not exist");
        return claims[_claimHash];
    }
}

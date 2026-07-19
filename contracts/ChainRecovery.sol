// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract ChainRecovery {
    enum ItemType { LOST, FOUND }
    enum ItemStatus { REPORTED, CLAIMED, VERIFIED, RECOVERED }

    struct Claim {
        uint256 id;
        address claimant;
        string description;
        bool approved;
        bool rejected;
        bool resolved;
    }

    struct Item {
        uint256 id;
        string title;
        string description;
        string category;
        ItemType itemType;
        ItemStatus status;
        string location;
        string date;
        uint256 reward;
        string imageHash;
        address reporter;
        address resolver;
        string serialNumber;
        uint256 claimsCount;
    }

    uint256 private _itemCount;
    mapping(uint256 => Item) private _items;
    mapping(uint256 => mapping(uint256 => Claim)) private _claims;

    event ItemReported(uint256 indexed itemId, address indexed reporter, ItemType indexed itemType, uint256 reward);
    event ClaimSubmitted(uint256 indexed itemId, uint256 indexed claimId, address indexed claimant);
    event ClaimVerified(uint256 indexed itemId, uint256 indexed claimId, address indexed resolver);
    event ClaimRejected(uint256 indexed itemId, uint256 indexed claimId);
    event ItemRecovered(uint256 indexed itemId, address indexed owner, address indexed finder);

    modifier onlyReporter(uint256 itemId) {
        require(_items[itemId].reporter == msg.sender, 'Unauthorized');
        _;
    }

    function reportItem(string memory title, string memory description, string memory category, ItemType itemType, string memory location, string memory date, string memory imageHash, string memory serialNumber) public payable returns (uint256) {
        _itemCount++;
        uint256 itemId = _itemCount;
        _items[itemId] = Item(itemId, title, description, category, itemType, ItemStatus.REPORTED, location, date, msg.value, imageHash, msg.sender, address(0), serialNumber, 0);
        emit ItemReported(itemId, msg.sender, itemType, msg.value);
        return itemId;
    }

    function submitClaim(uint256 itemId, string memory description) public returns (uint256) {
        Item storage item = _items[itemId];
        require(item.status != ItemStatus.RECOVERED, 'InvalidState');
        item.claimsCount++;
        uint256 claimId = item.claimsCount;
        _claims[itemId][claimId] = Claim(claimId, msg.sender, description, false, false, false);
        item.status = ItemStatus.CLAIMED;
        emit ClaimSubmitted(itemId, claimId, msg.sender);
        return claimId;
    }

    function verifyClaim(uint256 itemId, uint256 claimId) public onlyReporter(itemId) {
        Item storage item = _items[itemId];
        Claim storage claim = _claims[itemId][claimId];
        require(item.status == ItemStatus.CLAIMED, 'InvalidState');
        require(!claim.resolved, 'InvalidState');
        claim.approved = true;
        claim.resolved = true;
        item.resolver = claim.claimant;
        item.status = ItemStatus.VERIFIED;
        emit ClaimVerified(itemId, claimId, claim.claimant);
    }

    function rejectClaim(uint256 itemId, uint256 claimId) public onlyReporter(itemId) {
        Item storage item = _items[itemId];
        Claim storage claim = _claims[itemId][claimId];
        require(!claim.resolved, 'InvalidState');
        claim.rejected = true;
        claim.resolved = true;
        bool activeClaimsExist = false;
        for (uint256 i = 1; i <= item.claimsCount; i++) {
            if (!_claims[itemId][i].resolved) {
                activeClaimsExist = true;
                break;
            } 
        }
        if (!activeClaimsExist) item.status = ItemStatus.REPORTED;
        emit ClaimRejected(itemId, claimId);
    }

    function confirmRecovery(uint256 itemId) public payable {
        Item storage item = _items[itemId];
        require(item.status == ItemStatus.VERIFIED, 'InvalidState');
        require(msg.sender == item.reporter || msg.sender == item.resolver, 'Unauthorized');
        item.status = ItemStatus.RECOVERED;
        if (item.reward > 0) {
            uint256 payout = item.reward;
            item.reward = 0;
            if (item.itemType == ItemType.LOST) {
                address(uint160(item.resolver)).transfer(payout);
            } else {
                address(uint160(item.reporter)).transfer(payout);
            }
        }
        emit ItemRecovered(itemId, item.resolver, item.reporter);
    }

    function getItem(uint256 itemId) public view returns (Item memory) {
        return _items[itemId];
    }

    function getClaim(uint256 itemId, uint256 claimId) public view returns (Claim memory) {
        return _claims[itemId][claimId];
    }

    function getItemCount() public view returns (uint256) {
        return _itemCount;
    }
}
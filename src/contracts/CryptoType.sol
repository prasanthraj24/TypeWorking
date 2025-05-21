// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title CryptoType
 * @dev A contract for rewarding users who type documents with Ethereum
 */
contract CryptoType is Ownable, ReentrancyGuard {
    // Fee percentages (out of 100)
    uint8 public constant USER_SHARE = 30;
    uint8 public constant ADMIN_SHARE = 70;
    
    // User roles
    enum Role { User, Uploader, Admin }
    
    // User struct
    struct User {
        address userAddress;
        Role role;
        string username;
        uint256 balance;
        bool exists;
    }
    
    // Document struct
    struct Document {
        uint256 id;
        address uploader;
        string title;
        string contentHash; // Hash of the document content
        uint256 reward;
        uint256 wordCount;
        bool active;
    }
    
    // Task completion struct
    struct TaskCompletion {
        uint256 id;
        uint256 documentId;
        address user;
        uint256 accuracy;
        uint256 wordsTyped;
        uint256 earnedAmount;
        uint256 timestamp;
    }
    
    // Mappings
    mapping(address => User) public users;
    mapping(uint256 => Document) public documents;
    mapping(uint256 => TaskCompletion) public completions;
    
    // State variables
    uint256 public documentCount;
    uint256 public completionCount;
    uint256 public totalDistributed;
    
    // Events
    event UserRegistered(address indexed userAddress, Role role, string username);
    event DocumentCreated(uint256 indexed id, address indexed uploader, string title, uint256 reward);
    event TaskCompleted(uint256 indexed id, uint256 indexed documentId, address indexed user, uint256 accuracy, uint256 earnedAmount);
    event Withdrawal(address indexed user, uint256 amount);
    
    /**
     * @dev Constructor sets the contract creator as admin
     */
    constructor() {
        _registerUser(msg.sender, Role.Admin, "Admin");
    }
    
    /**
     * @dev Register a new user
     * @param _role Role of the user
     * @param _username Username of the user
     */
    function registerUser(Role _role, string memory _username) external {
        require(!users[msg.sender].exists, "User already registered");
        
        // Only admin can create admin or uploader accounts
        if (_role == Role.Admin || _role == Role.Uploader) {
            require(users[msg.sender].role == Role.Admin, "Only admin can create admin or uploader accounts");
        }
        
        _registerUser(msg.sender, _role, _username);
    }
    
    /**
     * @dev Internal function to register a user
     */
    function _registerUser(address _userAddress, Role _role, string memory _username) internal {
        users[_userAddress] = User({
            userAddress: _userAddress,
            role: _role,
            username: _username,
            balance: 0,
            exists: true
        });
        
        emit UserRegistered(_userAddress, _role, _username);
    }
    
    /**
     * @dev Create a new document (Uploader or Admin only)
     * @param _title Title of the document
     * @param _contentHash Hash of the document content
     * @param _reward Reward amount in wei for completing the document
     * @param _wordCount Number of words in the document
     */
    function createDocument(string memory _title, string memory _contentHash, uint256 _reward, uint256 _wordCount) external {
        require(users[msg.sender].exists, "User not registered");
        require(users[msg.sender].role == Role.Uploader || users[msg.sender].role == Role.Admin, "Only uploaders and admins can create documents");
        
        documentCount++;
        
        documents[documentCount] = Document({
            id: documentCount,
            uploader: msg.sender,
            title: _title,
            contentHash: _contentHash,
            reward: _reward,
            wordCount: _wordCount,
            active: true
        });
        
        emit DocumentCreated(documentCount, msg.sender, _title, _reward);
    }
    
    /**
     * @dev Complete a typing task
     * @param _documentId ID of the document typed
     * @param _accuracy Accuracy percentage (0-100)
     * @param _wordsTyped Number of words typed correctly
     */
    function completeTask(uint256 _documentId, uint256 _accuracy, uint256 _wordsTyped) external payable nonReentrant {
        require(users[msg.sender].exists, "User not registered");
        require(_documentId <= documentCount && _documentId > 0, "Invalid document ID");
        require(documents[_documentId].active, "Document is not active");
        require(_accuracy <= 100, "Accuracy cannot exceed 100%");
        require(_wordsTyped <= documents[_documentId].wordCount, "Words typed cannot exceed document word count");
        
        Document storage doc = documents[_documentId];
        
        // Calculate earnings based on accuracy and words typed
        uint256 earnedAmount = (doc.reward * _wordsTyped * _accuracy) / (doc.wordCount * 100);
        
        // Ensure contract has enough balance
        require(address(this).balance >= earnedAmount, "Contract has insufficient balance");
        
        // Calculate shares
        uint256 userShare = (earnedAmount * USER_SHARE) / 100;
        uint256 uploaderShare = earnedAmount - userShare;
        
        // Update user balance
        users[msg.sender].balance += userShare;
        
        // Update uploader balance
        users[doc.uploader].balance += uploaderShare;
        
        // Track completion
        completionCount++;
        completions[completionCount] = TaskCompletion({
            id: completionCount,
            documentId: _documentId,
            user: msg.sender,
            accuracy: _accuracy,
            wordsTyped: _wordsTyped,
            earnedAmount: earnedAmount,
            timestamp: block.timestamp
        });
        
        // Update stats
        totalDistributed += earnedAmount;
        
        emit TaskCompleted(completionCount, _documentId, msg.sender, _accuracy, earnedAmount);
    }
    
    /**
     * @dev Withdraw accumulated balance
     * @param _amount Amount to withdraw
     */
    function withdraw(uint256 _amount) external nonReentrant {
        require(users[msg.sender].exists, "User not registered");
        require(users[msg.sender].balance >= _amount, "Insufficient balance");
        
        users[msg.sender].balance -= _amount;
        
        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "Transfer failed");
        
        emit Withdrawal(msg.sender, _amount);
    }
    
    /**
     * @dev Fund the contract
     */
    function fundContract() external payable {
        // This function just receives ETH
    }
    
    /**
     * @dev Get user details
     * @param _userAddress Address of the user
     */
    function getUserDetails(address _userAddress) external view returns (
        Role role,
        string memory username,
        uint256 balance,
        bool exists
    ) {
        User storage user = users[_userAddress];
        return (user.role, user.username, user.balance, user.exists);
    }
    
    /**
     * @dev Set document active status (Admin only)
     * @param _documentId ID of the document
     * @param _active Active status
     */
    function setDocumentActive(uint256 _documentId, bool _active) external {
        require(users[msg.sender].role == Role.Admin, "Admin only");
        require(_documentId <= documentCount && _documentId > 0, "Invalid document ID");
        
        documents[_documentId].active = _active;
    }
    
    /**
     * @dev Change user role (Admin only)
     * @param _userAddress Address of the user
     * @param _newRole New role
     */
    function changeUserRole(address _userAddress, Role _newRole) external {
        require(users[msg.sender].role == Role.Admin, "Admin only");
        require(users[_userAddress].exists, "User does not exist");
        
        users[_userAddress].role = _newRole;
    }
    
    /**
     * @dev Contract balance
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
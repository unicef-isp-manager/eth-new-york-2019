pragma solidity >=0.4.22 <0.6.0;
import "chainlink/contracts/ChainlinkClient.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract DonationsManager is ChainlinkClient, Ownable {
  
    event UpdatedISP(
      address indexed isp, 
      bytes32 indexed countryName,
      uint indexed monthlyServiceCost
    );

    event DonationAdded(
      bytes32 countryName,
      address donor, 
      uint amount, 
      uint time
    );

    event WithdrawalISP(
      bytes32 countryName,
      address ISP, 
      uint amount
    );

    address public _owner;
    uint256 currentPrice;

    // TODO: regions instead of countries

    struct Country {
      address currentISP;
      uint balance;
      uint monthlyServiceCost;
    }
    
    mapping (bytes32 => Country) public countries;

    struct Donation {
      address donor;
      uint amount;
      uint timestamp;
      bytes32 countryName;
    }
    
    mapping (address => Donation) public donations;

    // TODO need to hold number of withdrawls per ISP provider. Increment +1 if metrics are met. CRON job calls the increment function.
    // also could hold that provider's performance threshold and custom contract params.

    
    mapping (bytes32 => bool) public ISPstatuses;
    
    mapping (bytes32 => bytes32) public reciepts;

    // only the current internet service provider can withdrawl 
    modifier isISP(bytes32 name) {
        require(countries[name].currentISP == msg.sender, 'not the ISP for this country');
        _;
    }
    
    modifier onlyOwner() {
        require(msg.sender == _owner, 'not the owner');
        _;
    }

    constructor() public {
        _owner = msg.sender;
        setPublicChainlinkToken();
    }
    
    function updateISP(address isp, bytes32 country, uint serviceCost) public onlyOwner {
        countries[country].currentISP = isp;
        countries[country].monthlyServiceCost = serviceCost;
        emit UpdatedISP(isp, country, serviceCost);
    }
    
    function addDonation(bytes32 nameofCountry) public payable {
        donations[msg.sender].donor = msg.sender;
        donations[msg.sender].amount = msg.value;
        donations[msg.sender].countryName = nameofCountry;
        donations[msg.sender].timestamp = now;
        emit DonationAdded(nameofCountry, msg.sender, msg.value, now);
    }
    
    function withdraw(bytes32 countryName) public isISP(countryName) {
        require(countries[countryName].currentISP == msg.sender, 'not the ISP for this country');
        require(countries[countryName].balance >= countries[countryName].monthlyServiceCost, 'not enough funding for cover monthly cost');
        countries[countryName].balance -= countries[countryName].monthlyServiceCost;
        msg.sender.transfer(countries[countryName].monthlyServiceCost);
        emit WithdrawalISP(countryName, msg.sender, countries[countryName].monthlyServiceCost);
    }

    // could move the provider's performance threshold to the contract, would need to change this function
    function checkISPperformance(address _oracle, string _jobId, string _ISP)
      public
      onlyOwner
    {
      Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(_jobId), this, this.fulfill.selector); // edit
      req.add("url", append("http://unicef-isp-manager.ngrok.io/isps/", _ISP));
      reciepts[sendChainlinkRequestTo(_oracle, req, 1*LINK)] = stringToBytes32(_ISP);
    }

    function fulfill(bytes32 _requestId, bool _valid)  // edit
      public
      recordChainlinkFulfillment(_requestId)
    {
      ISPstatuses[reciepts[_requestId]] = _valid;
      delete reciepts[_requestId];
    }

    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
      bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
      return 0x0;
    }
    
    assembly {
        result := mload(add(source, 32))
      }
    }
  
    function getStatus(string _ISP) public view returns (bool) {
        return ISPstatuses[stringToBytes32(_ISP)];
    }
    
    function append(string a, string b) internal pure returns (string) {
      return string(abi.encodePacked(a, b));
    }

}

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
    function addDonation(bytes32 nameofCountry) public {
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

      function requestEthereumPrice(address _oracle, string _jobId)
    public
    onlyOwner
  {
    Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(_jobId), this, this.fulfill.selector); // edit
    req.add("url", "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");
    req.add("path", "USD");
    req.addInt("times", 100);
    sendChainlinkRequestTo(_oracle, req, 1*LINK);
  }

  function fulfill(bytes32 _requestId, uint256 _price)  // edit
    public
    recordChainlinkFulfillment(_requestId)
  {
    currentPrice = _price; //currentPrice var doesnät exist need action. C
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


}

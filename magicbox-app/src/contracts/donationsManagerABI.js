const abi = [
  {
    constant: false,
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: '_owner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    name: 'donations',
    outputs: [
      {
        name: 'donor',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
      {
        name: 'timestamp',
        type: 'uint256',
      },
      {
        name: 'countryName',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'countries',
    outputs: [
      {
        name: 'currentISP',
        type: 'address',
      },
      {
        name: 'balance',
        type: 'uint256',
      },
      {
        name: 'monthlyServiceCost',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'isp',
        type: 'address',
      },
      {
        indexed: true,
        name: 'countryName',
        type: 'bytes32',
      },
      {
        indexed: true,
        name: 'monthlyServiceCost',
        type: 'uint256',
      },
    ],
    name: 'UpdatedISP',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'countryName',
        type: 'bytes32',
      },
      {
        indexed: false,
        name: 'donor',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'time',
        type: 'uint256',
      },
    ],
    name: 'DonationAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'countryName',
        type: 'bytes32',
      },
      {
        indexed: false,
        name: 'ISP',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'WithdrawalISP',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'previousOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipRenounced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'ChainlinkRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'ChainlinkFulfilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'ChainlinkCancelled',
    type: 'event',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'isp',
        type: 'address',
      },
      {
        name: 'country',
        type: 'bytes32',
      },
      {
        name: 'serviceCost',
        type: 'uint256',
      },
    ],
    name: 'updateISP',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'nameofCountry',
        type: 'bytes32',
      },
    ],
    name: 'addDonation',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'countryName',
        type: 'bytes32',
      },
    ],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_oracle',
        type: 'address',
      },
      {
        name: '_jobId',
        type: 'string',
      },
    ],
    name: 'requestEthereumPrice',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_requestId',
        type: 'bytes32',
      },
      {
        name: '_price',
        type: 'uint256',
      },
    ],
    name: 'fulfill',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
export default abi;

# Ethereum Smart Contract

The DonationsManager contract does a few things. It accepts donations, stores the current ISP provider, receives data on connectivity from a server through a chainlink oracle, and allows the ISPs to withdraw funds, or not. For PoC the districts are countries.

## Running Locally

This is a truffle box project. 

### Installation

```bash
npm install
```

Or

```bash
yarn install
```

## Test

```bash
npm test
```

## Deploy

If needed, edit the `truffle-config.js` config file to set the desired network to a different port. It assumes any network is running the RPC port on 8545.

```bash
npm run migrate:dev
```

For deploying to live networks, Truffle will use `truffle-hdwallet-provider` for your mnemonic and an RPC URL. Set your environment variables `$RPC_URL` and `$MNEMONIC` before running:

```bash
npm run migrate:live
```

<!-- ### Remix -->

<!-- A version of this contract is already deployed on Rinkeby at 0x458C5C6e8fd90D0432Bb4Ed370A18a1A07f875Bb -->


Implementation of [how to make a Chainlinked contract](https://docs.chain.link/docs/getting-started).
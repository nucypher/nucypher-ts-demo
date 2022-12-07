# nucypher-ts-demo

See the demo in action [here](https://nucypher-ts-demo.netlify.app/).

## Installation

Inspect `./src/characters.ts` and set character configuration.

Install dependencies and run:

```bash
yarn install
yarn start
```

## Usage

To run this demo will need a MetaMask with an account funded with enough Ethereum to fund Policy contract creation.

It is also recommended to change `secretKey` values for Alice and Bob's characters. See `./src/characters.ts` for details.

### Mainnet (Polygon)

`nucypher-ts` is in early release. We recommend **not** using it in production _just yet_.

### Tapir (Matic Mumbai)

`nucypher-ts-demo` is configured to work on the Tapir network out-of-the-box. It uses a public Porter instance by default. See `./src/characters.ts` for details.

This is a recommended way to use `nucypher-ts` on a testnet.

## References

This dApp is based on [`useDapp` example](https://github.com/EthWorks/useDapp/tree/master/packages/example). See `README.old.md` for details.

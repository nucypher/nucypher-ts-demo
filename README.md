# nucypher-ts-demo

See the demo in action [here](https://blissful-hopper-34fc59.netlify.app/alice-grants).

## Installation

Inspect `./src/characters.ts` and set character configuration.

Install dependencies and run:

```bash
yarn install
yarn start
```

## Usage

In order to run this demo will need a MetaMask with an account funded with enough Ethereum to fund Policy contract creation.

It is also recommended to change `secretKey` values for Alice and Bob characters. See `./src/characters.ts` for details.

### Mainnet

`nucypher-ts` is in an early release. We recommend **not** using it in production _just yet_.

### Lynx (Görli Testnet)

`nucypher-ts-demo` is configured to work on Lynx network out-of-the-box. It uses public Porter instance by default. See `./src/characters.ts` for details.

This is a recommended way to use `nucypher-ts` on a testnet.

### Ibex (Rinkeby Testnet)

Running `nucypher-ts-demo` on Ibex requires setting up a local [Porter](hhttps://docs.nucypher.com/en/latest/application_development/porter.html#porter-service) instance. It's also recommended to run your own instance of Ursula, and use it in as part of `includeUrsula` configuration in `Alice::grant` method.

Ibex is a preferred testnet for local development when contributing to `nucypher-ts`. Because of it's instability and substantial operational overhead, it's **not** recommended for developers looking to integrate `nucypher-ts` into their applications - Please use Lynx testnet instead.

## References

This dApp is based on [`useDapp` example](https://github.com/EthWorks/useDapp/tree/master/packages/example).

# nucypher-ts-demo

Notice: `nucypher-ts-demo` requires setting up [Porter](hhttps://docs.nucypher.com/en/latest/application_development/porter.html#porter-servicer).

In order to run this time you have to provide `Alice` with `secretKey` that corresponds to an actual Ethereum account already funded with ETH. This is because in current state transactions are from character wallet rather than account from web3 provider. See `/src/characters`.

It's also recommended to run your own instance of Ursula, and use it in as part of `includeUrsula` configuration in `Alice::grant` method.

## Installation

Inspect `./src/characters.ts` and set character configuration.

Install dependencies and run:

```bash
yarn install
yarn start
```

## Sources

Based on [`useDapp` example](https://github.com/EthWorks/useDapp/tree/master/packages/example). See `README.old.md` for details.

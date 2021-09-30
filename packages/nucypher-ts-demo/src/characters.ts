import { Alice, Bob } from 'nucypher-ts'
import type { Provider } from '@ethersproject/providers'

const config = {
  porterUri: 'http://127.0.0.1:9155',
}

export const makeAlice = (provider: Provider): Alice => {
  const secretKey = Buffer.from('fake-secret-key-32-bytes-alice-x')
  const alice = Alice.fromSecretKey(config, secretKey)
  alice.connect(provider)
  return alice
}

export const makeBob = (): Bob => {
  const secretKey = Buffer.from('fake-keyring-seed-32-bytes-bob-x')
  return Bob.fromSecretKey(config, secretKey)
}

export const makeRemoteBob = (): Bob => {
  // The difference between a "Bob" and a "remote Bob" is that we only have
  // access to public parameters in the latter, whereas in the former
  // we also have access to Bob's secret key
  const bob = makeBob()
  return Bob.fromPublicKeys(config, bob.verifyingKey, bob.decryptingKey)
}

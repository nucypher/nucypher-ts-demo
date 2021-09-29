import { Alice, NucypherKeyring, Bob } from 'nucypher-ts'
import type { Provider } from '@ethersproject/providers'

const config = {
  porterUri: 'http://127.0.0.1:9155',
}

export const makeAlice = (provider: Provider): Alice => {
  const seed = Buffer.from('0c6f4dc1935a45db426058988717ccf3137948754ab973a6e477ce076056e4cd', 'hex')
  const keyring = new NucypherKeyring(seed)
  const alice = Alice.fromKeyring(config, keyring)
  alice.connect(provider)
  return alice
}

export const makeBob = (): Bob => {
  const seed = Buffer.from('fake-keyring-seed-32-bytes-bob-x')
  const keyring = new NucypherKeyring(seed)
  return Bob.fromKeyring(config, keyring)
}

export const makeRemoteBob = (): Bob => {
  // The difference between a "Bob" and a "remote Bob" is that we only have
  // access to public parameters in the latter, whereas in the former
  // we also have access to Bob's secret key
  const bob = makeBob()
  return Bob.fromPublicKeys(config, bob.verifyingKey, bob.decryptingKey)
}

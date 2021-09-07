import { Alice, NucypherKeyring, Bob } from 'nucypher-ts'
import type { Provider } from '@ethersproject/providers'

export const config = {
  porterUri: 'http://127.0.0.1:9155',
}

export const mockAlice = (provider: Provider): Alice => {
  const seed = Buffer.from('0c6f4dc1935a45db426058988717ccf3137948754ab973a6e477ce076056e4cd', 'hex')
  const keyring = new NucypherKeyring(seed)
  const alice = Alice.fromKeyring(config, keyring)
  alice.connect(provider)
  return alice
}

export const mockBob = (): Bob => {
  const seed = Buffer.from('fake-keyring-seed-32-bytes-bob-x')
  const keyring = new NucypherKeyring(seed)
  return Bob.fromKeyring(config, keyring)
}

export const mockRemoteBob = (): Bob => {
  const bob = mockBob()
  return Bob.fromPublicKeys(config, bob.signer.verifyingKey(), bob.decryptingKey)
}

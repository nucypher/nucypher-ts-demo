import { Alice, Bob, RemoteBob } from 'nucypher-ts'
import type { Web3Provider } from '@ethersproject/providers'

const config = {
  porterUri: 'http://127.0.0.1:9155',
}

export const makeAlice = (provider: Web3Provider): Alice => {
  const secretKey = Buffer.from('fake-secret-key-32-bytes-alice-x')
  return Alice.fromSecretKeyBytes(config, secretKey, provider)
}

export const makeBob = (): Bob => {
  const secretKey = Buffer.from('fake-keyring-seed-32-bytes-bob-x')
  return Bob.fromSecretKey(config, secretKey)
}

export const makeRemoteBob = (): RemoteBob => {
  // The difference between a "Bob" and a "remote Bob" is that we only have
  // access to public parameters in the latter, whereas in the former
  // we also have access to Bob's secret key
  const { decryptingKey, verifyingKey } = makeBob()
  return RemoteBob.fromKeys(decryptingKey, verifyingKey)
}

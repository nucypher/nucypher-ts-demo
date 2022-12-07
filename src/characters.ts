import { Alice, Bob, RemoteBob, SecretKey } from '@nucypher/nucypher-ts'
import type { Web3Provider } from '@ethersproject/providers'


export const makeAlice = (provider: Web3Provider, porterUri: string): Alice => {
  const secretKey = SecretKey.fromBytes(Buffer.from('fake-secret-key-32-bytes-alice-x'))
  return Alice.fromSecretKey({ porterUri }, secretKey, provider)
}

export const makeBob = (porterUri: string): Bob => {
  const secretKey = SecretKey.fromBytes(Buffer.from('fake-secret-key-32-bytes-bob-xxx'))
  return Bob.fromSecretKey({ porterUri }, secretKey)
}

export const makeRemoteBob = (porterUri: string): RemoteBob => {
  // The difference between a "Bob" and a "remote Bob" is that we only have
  // access to public parameters in the latter, whereas in the former
  // we also have access to Bob's secret key
  const { decryptingKey, verifyingKey } = makeBob(porterUri)
  return { decryptingKey, verifyingKey }
}

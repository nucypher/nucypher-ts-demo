import { useEthers } from '@usedapp/core'
import { Alice, Bob, NucypherKeyring } from 'nucypher-ts'
import React from 'react'
import type ethers from 'ethers'
import { Button } from '../base/Button'

const config = {
  porterUri: 'http://127.0.0.1:80',
}

const mockAlice = (provider: ethers.providers.Provider): Alice => {
  const aliceKeyringSeed = Buffer.from('fake-keyring-seed-32-bytes-alice')
  const aliceKeyring = new NucypherKeyring(aliceKeyringSeed)
  const alice = Alice.fromKeyring(config, aliceKeyring)
  console.log({ alice })
  // alice.connect(provider)
  return alice
}

const mockBob = (): Bob => {
  const bobKeyringSeed = Buffer.from('fake-keyring-seed-32-bytes-bob-x')
  const bobKeyring = new NucypherKeyring(bobKeyringSeed)
  return Bob.fromKeyring(config, bobKeyring)
}

const mockRemoteBob = (): Bob => {
  const bob = mockBob()
  return Bob.fromPublicKeys(config, bob.signer.verifyingKey(), bob.encryptingPublicKey)
}

const runDemo = async (provider?: ethers.providers.Provider) => {
  if (!provider) {
    return
  }
  const alice = mockAlice(provider)
  const remoteBob = mockRemoteBob()

  const m = 2
  const n = 3
  const expired = new Date()
  const label = 'fake-data-label'
  const policy = await alice.grant(remoteBob, label, m, n, expired)
  console.log({ policy })
}

export const AliceGrants = () => {
  const { library } = useEthers()

  return (
    <div>
      <Button onClick={() => runDemo(library)}>Run demo</Button>
      <hr></hr>
      <h3>See console for results</h3>
    </div>
  )
}

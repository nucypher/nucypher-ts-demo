import { useEthers } from '@usedapp/core'
import { Alice, Bob, NucypherKeyring } from 'nucypher-ts'
import React from 'react'
import type { Provider } from '@ethersproject/providers'
import { Button } from '../base/Button'

export const AliceGrants = () => {
  const config = {
    porterUri: 'http://127.0.0.1:80',
  }

  const mockAlice = (provider: Provider): Alice => {
    const seed = Buffer.from('0c6f4dc1935a45db426058988717ccf3137948754ab973a6e477ce076056e4cd', 'hex')
    const keyring = new NucypherKeyring(seed)
    const alice = Alice.fromKeyring(config, keyring)
    alice.connect(provider)
    return alice
  }

  const mockBob = (): Bob => {
    const seed = Buffer.from('fake-keyring-seed-32-bytes-bob-x')
    const keyring = new NucypherKeyring(seed)
    return Bob.fromKeyring(config, keyring)
  }

  const mockRemoteBob = (): Bob => {
    const bob = mockBob()
    return Bob.fromPublicKeys(config, bob.signer.verifyingKey(), bob.encryptingPublicKey)
  }

  const runDemo = async (provider?: Provider) => {
    if (!provider) {
      return
    }
    const alice = mockAlice(provider)
    const bob = mockRemoteBob()
    const label = `fake-data-label-${Date.now()}` // Combination of `label` and `bob` must be unique
    const m = 2
    const n = 3
    const paymentPeriods = 3
    const value = n * paymentPeriods
    const policyParams = { bob, label, m, n, paymentPeriods, value }
    const policy = await alice.grant(policyParams)
    console.log({policy})
  }

  const { library } = useEthers()

  return (
    <div>
      <Button onClick={() => runDemo(library)}>Run demo</Button>
      <hr></hr>
      <h3>See console for results</h3>
    </div>
  )
}

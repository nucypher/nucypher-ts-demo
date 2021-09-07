/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Enrico, PublicKey } from 'nucypher-ts'
import { useEthers } from '@usedapp/core'
import type { BlockchainPolicyParameters } from 'nucypher-ts'
import React, { useState } from 'react'
import type { Provider } from '@ethersproject/providers'

import { PolicyForm } from './PolicyForm'
import { mockRemoteBob, mockAlice, mockBob } from '../../mock'
import { EncryptInput } from '../Enrico/EncryptInput'
import type { EnactedPolicy } from 'nucypher-ts/build/main/src/policies/policy'
import { Button } from '../base/Button'
import type { MessageKit } from 'nucypher-ts/build/main/src/kits/message'

export const AliceGrants = () => {
  const bob = mockRemoteBob()
  const label = `fake-data-label-${new Date().getTime()}` // Combination of `label` and `bob` must be unique
  const threshold = 1
  const shares = 1
  const paymentPeriods = 3
  const rate = 500000000000 + 1 // call `getMinFeeRate` for each ursula when creating a policy
  const intialParams: BlockchainPolicyParameters = { bob, label, threshold, shares, paymentPeriods, rate } // TODO: Do not use this struct outside `nucypher-ts`

  // Create policy vars
  const [policyParams, setPolicyParams] = useState(intialParams)
  const [policyEncryptingKey, setPolicyEncryptingKey] = useState(undefined as PublicKey | undefined)
  const [policy, setPolicy] = useState(undefined as EnactedPolicy | undefined)
  const [aliceVerifyingKey, setAliceVeryfingKey] = useState(undefined as PublicKey | undefined)
  const [policyFormEnabled, setPolicyFormEnabled] = useState(true)

  // Encrypt message vars
  const [encryptedMessage, setEncryptedMessage] = useState(undefined as MessageKit | undefined)
  const [decryptionEnabled, setDecryptionEnabled] = useState(false)

  // Decrypt message vars
  const [decryptedMessage, setDecryptedMessage] = useState('')


  // Alice, Enrico and Bob are supposed to have their own subpages eventually (see: "TopBar.tsx")
  // Currently, for conveniance sake all, all their functions are cobbled together in this component

  // This should happen in Alice's subpage
  const grantToBob = async (provider?: Provider) => {
    if (!provider) {
      return
    }

    setPolicyFormEnabled(false)

    const alice = mockAlice(provider)
    const policyEncryptingKey = await alice.getPolicyEncryptingKeyFromLabel('label')
    const policy = await alice.grant(policyParams)

    setAliceVeryfingKey(alice.verifyingKey)
    setPolicyEncryptingKey(policyEncryptingKey)
    setPolicy(policy)
    setPolicyFormEnabled(true)

    console.log('policy ok')
  }

  // This should happen in Enrico's subpage
  const encrypt = (plaintext: string) => {
    if (!policyEncryptingKey) {
      return
    }

    const enrico = new Enrico(policyEncryptingKey)
    const encryptedMessage = enrico.encryptMessage(plaintext)

    setEncryptedMessage(encryptedMessage)
    setDecryptionEnabled(true)

    console.log('encryption ok')
  }

  // This should happen in Bobs's subpage
  const receiveMessageFromAlice = async () => {
    if (!(encryptedMessage && policyEncryptingKey && policy && aliceVerifyingKey)) {
      return
    }

    const { encryptedTreasureMap } = policy
    const bob = mockBob()
    const retrievedMessage = await bob.retrieveAndDecrypt(
      policyEncryptingKey,
      aliceVerifyingKey,
      [encryptedMessage],
      encryptedTreasureMap
    )

    const dec = new TextDecoder()
    setDecryptedMessage(dec.decode(retrievedMessage[0]))

    console.log('decryption ok')
  }

  const { library } = useEthers()

  return (
    <div>
      <div>
        <PolicyForm
          enabled={policyFormEnabled}
          policyParams={policyParams}
          setPolicyParams={setPolicyParams}
          grantToBob={() => grantToBob(library)}
        />
      </div>
      <hr></hr>
      <div>
        <EncryptInput encrypt={encrypt} />
      </div>
      <hr></hr>
      <Button onClick={receiveMessageFromAlice} disabled={!decryptionEnabled}>
        Decrypt message
      </Button>
      <hr></hr>
      {decryptedMessage ? (
        <>
          <h2>Decrypted message:</h2>
          <h3>{decryptedMessage}:</h3>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

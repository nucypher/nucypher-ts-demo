/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BlockchainPolicyParameters, Enrico, PublicKey, EnactedPolicy, MessageKit } from 'nucypher-ts'
import React, { useState } from 'react'
import type { Web3Provider } from '@ethersproject/providers'
import { useEthers } from '@usedapp/core'

import { AliceCreatesPolicy as AliceCreatesPolicy } from './AliceCreatesPolicy'
import { makeRemoteBob, makeAlice, makeBob } from '../../characters'
import { EnricoEncrypts } from './EnricoEncrypts'
import { BobDecrypts } from './BobDecrypts'
import { AliceRevokes } from './AliceRevokes'

export const getRandomLabel = () => `label-${new Date().getTime()}`

export const AliceGrants = () => {
  // These policy parameters will be used by Alice to create a blockchain policy
  const remoteBob = makeRemoteBob()
  const threshold = 1
  const shares = 1
  const paymentPeriods = 3
  const rate = 50000000000000 // TODO: Make this an optional and call `getMinFeeRate` for each ursula when creating a policy
  const intialParams: BlockchainPolicyParameters = { bob: remoteBob, label: getRandomLabel(), threshold, shares, paymentPeriods, rate }

  // Create policy vars
  const [policyParams, setPolicyParams] = useState(intialParams)
  const [policyEncryptingKey, setPolicyEncryptingKey] = useState(undefined as PublicKey | undefined)
  const [policy, setPolicy] = useState(undefined as EnactedPolicy | undefined)
  const [aliceVerifyingKey, setAliceVeryfingKey] = useState(undefined as PublicKey | undefined)
  const [policyFormEnabled, setPolicyFormEnabled] = useState(true)

  // Encrypt message vars
  const [encryptionEnabled, setEncryptionEnabled] = useState(false)
  const [encryptedMessage, setEncryptedMessage] = useState(undefined as MessageKit | undefined)

  // Decrypt message vars
  const [decryptionEnabled, setDecryptionEnabled] = useState(false)
  const [decryptedMessage, setDecryptedMessage] = useState('')

  // Revoke policy vars
  const [revokeEnabled, setRevokeEnabled] = useState(false)
  const [revokeInProgress, setRevokeInProgress] = useState(false)

  const grantToBob = async (provider?: Web3Provider) => {
    if (!provider) {
      return
    }
    setPolicyFormEnabled(false)

    const alice = makeAlice(provider)
    const includeUrsulas: string[] = []
    const excludeUrsulas: string[] = []
    const policy = await alice.grant(policyParams, includeUrsulas, excludeUrsulas)

    setAliceVeryfingKey(alice.verifyingKey)
    setPolicyEncryptingKey(policy.policyKey)
    setPolicy(policy)
    setPolicyFormEnabled(true)
    setEncryptionEnabled(true)

    setPolicyParams({ ...policyParams, label: getRandomLabel() })
  }

  const encryptMessage = (plaintext: string) => {
    if (!policyEncryptingKey) {
      return
    }

    // Enrico pops up here for just a second to do some work for Alice
    const enrico = new Enrico(policyEncryptingKey)
    const encryptedMessage = enrico.encryptMessage(plaintext)

    setEncryptedMessage(encryptedMessage)
    setDecryptionEnabled(true)
  }

  const decryptMessage = async () => {
    if (!(encryptedMessage && policyEncryptingKey && policy && aliceVerifyingKey)) {
      return
    }

    const { encryptedTreasureMap } = policy
    const bob = makeBob()
    const retrievedMessage = await bob.retrieveAndDecrypt(
      policyEncryptingKey,
      aliceVerifyingKey,
      [encryptedMessage],
      encryptedTreasureMap
    )
    const dec = new TextDecoder()

    setDecryptedMessage(dec.decode(retrievedMessage[0]))
    setRevokeEnabled(true)
  }

  const revokePolicy = async (provider?: Web3Provider) => {
    if (!provider) {
      return
    }

    if (!(encryptedMessage && policyEncryptingKey && policy && aliceVerifyingKey)) {
      return
    }

    setRevokeInProgress(true)

    const alice = makeAlice(provider)
    await alice.revoke(policy)

    setRevokeInProgress(false)
  }

  // Ethers-js is our web3 provider
  const { library } = useEthers()

  return (
    <div style={{ display: 'grid' }}>
      <AliceCreatesPolicy
        enabled={policyFormEnabled}
        policyParams={policyParams}
        setPolicyParams={setPolicyParams}
        grantToBob={() => grantToBob(library)}
      />
      <EnricoEncrypts enabled={encryptionEnabled} encrypt={encryptMessage} />
      <BobDecrypts enabled={decryptionEnabled} decrypt={decryptMessage} decryptedMessage={decryptedMessage} />
      <AliceRevokes enabled={revokeEnabled} inProgress={revokeInProgress} revoke={() => revokePolicy(library)} />
    </div>
  )
}

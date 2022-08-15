/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  generateTDecEntities,
  BlockchainPolicyParameters,
  Enrico,
  PublicKey,
  EnactedPolicy,
  MessageKit,
  defaultConfiguration,
  Bob,
} from '@nucypher/nucypher-ts'
import React, { useEffect, useState } from 'react'
import type { Web3Provider } from '@ethersproject/providers'
import { ChainId, useEthers } from '@usedapp/core'

import { AliceCreatesPolicy } from './buildEntities'
import { makeRemoteBob, makeAlice, makeBob } from '../../characters'
import { EnricoEncrypts } from './EnricoEncrypts'
import { BobDecrypts } from './BobDecrypts'
import { NetworkConfig } from './NetworkConfig'

export interface INetworkConfig {
  includeUrsulas: string[]
  excludeUrsulas: string[]
  porterUri: string
}

export interface ItDecConfig {
  threshold: number,
  shares: number,
  label: string,
  startDate: Date,
  endDate: Date,
}

export const getRandomLabel = () => `label-${new Date().getTime()}`

export const BuildConfig = () => {
  // Ethers-js is our web3 provider
  const { library, chainId } = useEthers()

  // Network config vars
  const initialNetworkConfig = {
    includeUrsulas: [] as string[],
    excludeUrsulas: [] as string[],
    porterUri: defaultConfiguration(ChainId.Mumbai).porterUri,
  }

  const [networkConfig, setNetworkConfig] = useState<INetworkConfig>(initialNetworkConfig)

  // Inital tDec config params
  const threshold = 2
  const shares = 3
  const startDate = new Date()
  const endDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // In 30 days
  const intialParams = {
    label: getRandomLabel(),
    threshold,
    shares,
    startDate,
    endDate,
  }

  // Create policy vars
  const [policyParams, setPolicyParams] = useState(intialParams)
  const [policyEncryptingKey, setPolicyEncryptingKey] = useState(undefined as PublicKey | undefined)
  const [policy, setPolicy] = useState(undefined as EnactedPolicy | undefined)
  const [aliceVerifyingKey, setAliceVeryfingKey] = useState(undefined as PublicKey | undefined)
  const [policyFormEnabled, setPolicyFormEnabled] = useState(true)

  // tDec Entities
  const [encrypter, setEncrypter] = useState(undefined as Enrico | undefined)
  const [decrypter, setDecrypter] = useState(undefined as Bob | undefined)

  // Encrypt message vars
  const [encryptionEnabled, setEncryptionEnabled] = useState(false)
  const [encryptedMessage, setEncryptedMessage] = useState(undefined as MessageKit | undefined)

  // Decrypt message vars
  const [decryptionEnabled, setDecryptionEnabled] = useState(false)
  const [decryptedMessage, setDecryptedMessage] = useState('')

  // Revoke policy vars
  // const [revokeEnabled, setRevokeEnabled] = useState(false)
  // const [revokeInProgress, setRevokeInProgress] = useState(false)

  useEffect(() => {
    // Try setting default config based on currently selected network
    if (chainId) {
      const config = { ...networkConfig, ...defaultConfiguration(chainId) }
      setNetworkConfig(config)
    }
  }, [chainId])

  const grantToBob = async (provider?: Web3Provider) => {
    if (!provider) {
      return
    }
    const [encrypter, decrypter, policy] = await generateTDecEntities(
      policyParams.threshold,
      policyParams.shares,
      provider,
      policyParams.label,
      policyParams.startDate,
      policyParams.endDate,
      networkConfig.porterUri
    );
    setEncrypter(encrypter)
    setDecrypter(decrypter)
    setPolicy(policy)
    setPolicyFormEnabled(false)

    // const { includeUrsulas, excludeUrsulas } = networkConfig

    setAliceVeryfingKey(policy.aliceVerifyingKey)
    setPolicyEncryptingKey(policy.policyKey)
    setPolicyFormEnabled(true)
    setEncryptionEnabled(true)
  }

  const encryptMessage = (plaintext: string) => {
    if (!policyEncryptingKey) {
      return
    }

    // Enrico pops up here for just a second to do some work for Alice
    // const enrico = new Enrico(policyEncryptingKey)
    const encryptedMessage = encrypter.encryptMessage(plaintext)

    setEncryptedMessage(encryptedMessage)
    setDecryptionEnabled(true)
  }

  const decryptMessage = async () => {
    if (!(encryptedMessage && policyEncryptingKey && policy && aliceVerifyingKey)) {
      return
    }

    const { encryptedTreasureMap } = policy.encryptedTreasureMap
    const retrievedMessage = await decrypter.retrieveAndDecrypt(
      [encryptedMessage]
    )
    const dec = new TextDecoder()

    setDecryptedMessage(dec.decode(retrievedMessage[0]))
    // setRevokeEnabled(true)
  }

  return (
    <div style={{ display: 'grid', padding: '5px' }}>
      <NetworkConfig networkConfig={networkConfig} setNetworkConfig={setNetworkConfig} />
      <AliceCreatesPolicy
        enabled={policyFormEnabled}
        policyParams={policyParams}
        setPolicyParams={setPolicyParams}
        grantToBob={() => grantToBob(library)}
      />
      <EnricoEncrypts enabled={encryptionEnabled} encrypt={encryptMessage} encryptedMessage={encryptedMessage} />
      <BobDecrypts enabled={decryptionEnabled} decrypt={decryptMessage} decryptedMessage={decryptedMessage} />
      {/* <AliceRevokes enabled={revokeEnabled} inProgress={revokeInProgress} revoke={() => revokePolicy(library)} /> */}
    </div>
  )
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  makeTDecDecrypter,
  makeTDecEncrypter,
  Enrico,
  PublicKey,
  EnactedPolicy,
  MessageKit,
  defaultConfiguration,
  tDecDecrypter,
} from '@nucypher/nucypher-ts'
import React, { useEffect, useState } from 'react'
import type { Web3Provider } from '@ethersproject/providers'
import { ChainId, useEthers } from '@usedapp/core'

import { AliceCreatesPolicy } from './fetchConfig'
// import { makeRemoteBob, makeAlice, makeBob } from '../../characters'
import { EnricoEncrypts } from './EnricoEncrypts'
import { BobDecrypts } from './BobDecrypts'
import { NetworkConfig } from './NetworkConfig'
import type { ConditionSet } from '@nucypher/nucypher-ts/build/main/src/policies/conditions'

export interface INetworkConfig {
  porterUri: string
}

export interface ItDecConfig {
  label: string,
}

export const getRandomLabel = () => `label-${new Date().getTime()}`

export const AliceGrants = () => {
  // Ethers-js is our web3 provider
  const { library, chainId } = useEthers()

  // Network config vars
  const initialNetworkConfig = {
    porterUri: defaultConfiguration(ChainId.Mumbai).porterUri,
  }

  const initialTDecConfig = {
    label: "2-of-4-ibex",
  }

  const [networkConfig, setNetworkConfig] = useState<INetworkConfig>(initialNetworkConfig)
  const [tDecParams, settDecParams] = useState<ItDecConfig>(initialTDecConfig)


  // // Create policy vars
  // const [policyEncryptingKey, setPolicyEncryptingKey] = useState(undefined as PublicKey | undefined)
  // const [policy, setPolicy] = useState(undefined as EnactedPolicy | undefined)
  // const [aliceVerifyingKey, setAliceVeryfingKey] = useState(undefined as PublicKey | undefined)
  const [policyFormEnabled, setPolicyFormEnabled] = useState(true)

  // // tDec Entities
  const [encrypter, setEncrypter] = useState(undefined as Enrico | undefined)
  const [decrypter, setDecrypter] = useState(undefined as tDecDecrypter | undefined)

  // // Encrypt message vars
  const [encryptionEnabled, setEncryptionEnabled] = useState(false)
  const [encryptedMessage, setEncryptedMessage] = useState(undefined as MessageKit | undefined)

  // // Decrypt message vars
  const [decryptionEnabled, setDecryptionEnabled] = useState(false)
  const [decryptedMessage, setDecryptedMessage] = useState('')

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

    const decrypter = await makeTDecDecrypter(tDecParams.label, networkConfig.porterUri)
    const encrypter = await makeTDecEncrypter(tDecParams.label)

    setEncrypter(encrypter)
    setDecrypter(decrypter)

    setPolicyFormEnabled(false)
    setPolicyFormEnabled(true)
    
    setEncryptionEnabled(false)
    setEncryptionEnabled(true)

    setDecryptionEnabled(false)
    setDecryptionEnabled(true)
  }

  const encryptMessage = (plaintext: string, conditions?: ConditionSet) => {
    if (!encrypter) {
      return
    }
    encrypter.conditions = conditions
    const encryptedMessage = encrypter.encryptMessage(plaintext)

    setEncryptedMessage(encryptedMessage)
    setDecryptionEnabled(true)
  }

  const decryptMessage = async (cyphertext: MessageKit) => {
    if (!decrypter) {
      return
    }
    const retrievedMessage = await decrypter.retrieveAndDecrypt(
      [cyphertext]
    )
    const dec = new TextDecoder()

    setDecryptedMessage(dec.decode(retrievedMessage[0]))
  }

  return (
    <div style={{ display: 'grid', padding: '5px' }}>
      <NetworkConfig networkConfig={networkConfig} setNetworkConfig={setNetworkConfig} />
      <AliceCreatesPolicy
        enabled={policyFormEnabled}
        tDecParams={tDecParams}
        settDecParams={settDecParams}
        grantToBob={() => grantToBob(library)}
      />
      <EnricoEncrypts enabled={encryptionEnabled} encrypt={encryptMessage} encryptedMessage={encryptedMessage} />
      <BobDecrypts enabled={decryptionEnabled} decrypt={decryptMessage} decryptedMessage={decryptedMessage} />
    </div>
  )
}

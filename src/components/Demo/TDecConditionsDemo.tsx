/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  makeTDecDecrypter,
  makeTDecEncrypter,
  Enrico,
  MessageKit,
  defaultConfiguration,
  tDecDecrypter,
} from '@nucypher/nucypher-ts'
import React, { useEffect, useState } from 'react'
import { ChainId, useEthers } from '@usedapp/core'
import type { ConditionSet } from '@nucypher/nucypher-ts'
import { ethers } from 'ethers'

import { FetchTDecConfig } from './FetchConfig'
import { EnricoEncrypts } from './EnricoEncrypts'
import { BobDecrypts } from './BobDecrypts'
import { NetworkConfig } from './NetworkConfig'
import { ConditionList } from '../conditions/ConditionList'

export interface INetworkConfig {
  porterUri: string
}

export interface ItDecConfig {
  label: string
}

export const getRandomLabel = () => `label-${new Date().getTime()}`

export const AliceGrants = () => {
  // Ethers-js is our web3 provider
  const { library, chainId } = useEthers()

  // Network config vars
  const initialNetworkConfig = {
    // porterUri: defaultConfiguration(ChainId.Mumbai).porterUri,
    porterUri: 'http://127.0.0.1:80',
  }

  const initialTDecConfig = {
    label: '2-of-4-ibex',
  }

  // Initial config vars
  const [networkConfig, setNetworkConfig] = useState<INetworkConfig>(initialNetworkConfig)
  const [tDecParams, setTDecParams] = useState<ItDecConfig>(initialTDecConfig)

  // Create policy vars
  const [policyFormEnabled, setPolicyFormEnabled] = useState(true)

  // tDec Entities
  const [encrypter, setEncrypter] = useState(undefined as Enrico | undefined)
  const [decrypter, setDecrypter] = useState(undefined as tDecDecrypter | undefined)

  const [conditions, setConditions] = useState(undefined as ConditionSet | undefined)

  // // Encrypt message vars
  const [encryptionEnabled, setEncryptionEnabled] = useState(false)
  const [encryptedMessage, setEncryptedMessage] = useState(undefined as MessageKit | undefined)

  // // Decrypt message vars
  const [decryptionEnabled, setDecryptionEnabled] = useState(false)
  const [decryptedMessage, setDecryptedMessage] = useState('')

  useEffect(() => {
    // Try setting default config based on currently selected network
    if (chainId) {
      const config = {
        ...networkConfig,
        // ...defaultConfiguration(chainId)
        ...initialNetworkConfig, // TODO: Remove this
      }
      setNetworkConfig(config)
    }
  }, [chainId])

  const tDecDemo = async () => {
    const decrypter = await makeTDecDecrypter(tDecParams.label, networkConfig.porterUri)
    const encrypter = await makeTDecEncrypter(tDecParams.label)

    setEncrypter(encrypter)
    setDecrypter(decrypter)

    setPolicyFormEnabled(true)
    setEncryptionEnabled(true)
    setDecryptionEnabled(true)
  }

  const encryptMessage = (plaintext: string) => {
    if (!encrypter || !conditions) {
      return
    }
    encrypter.conditions = conditions
    console.log({ conditions: conditions.toJson() })
    const encryptedMessage = encrypter.encryptMessage(plaintext)
    console.log('encryptedMessage', encryptedMessage)
    console.log('encryptedMessage.toBytes()', encryptedMessage.toBytes())

    setEncryptedMessage(encryptedMessage)
    setDecryptionEnabled(true)
  }

  const decryptMessage = async (ciphertext: MessageKit) => {
    if (!decrypter || !library || !conditions) {
      return
    }
    const web3Provider = new ethers.providers.Web3Provider(library.provider)
    const conditionContext = conditions.buildContext(web3Provider)
    const retrievedMessage = await decrypter.retrieveAndDecrypt([ciphertext], conditionContext)
    const dec = new TextDecoder()

    setDecryptedMessage(dec.decode(retrievedMessage[0]))
  }

  return (
    <div style={{ display: 'grid', padding: '5px' }}>
      <NetworkConfig networkConfig={networkConfig} setNetworkConfig={setNetworkConfig} />
      <FetchTDecConfig
        enabled={policyFormEnabled}
        tDecParams={tDecParams}
        settDecParams={setTDecParams}
        tDecDemo={() => tDecDemo()}
      />
      <ConditionList conditions={conditions} setConditions={setConditions} />
      {conditions && (
        <>
          <EnricoEncrypts enabled={encryptionEnabled} encrypt={encryptMessage} encryptedMessage={encryptedMessage} />
          <BobDecrypts enabled={decryptionEnabled} decrypt={decryptMessage} decryptedMessage={decryptedMessage} />
        </>
      )}
    </div>
  )
}

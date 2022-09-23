/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  makeTDecDecrypter,
  makeTDecEncrypter,
  Enrico,
  MessageKit,
  tDecDecrypter,
  Configuration,
  PolicyMessageKit,
} from '@nucypher/nucypher-ts'
import React, { useEffect, useState } from 'react'
import { useEthers } from '@usedapp/core'
import type { ConditionSet } from '@nucypher/nucypher-ts'
import { ethers } from 'ethers'

import { FetchTDecConfig } from './FetchConfig'
import { EnricoEncrypts } from './EnricoEncrypts'
import { BobDecrypts } from './BobDecrypts'
import { NetworkConfig } from './NetworkConfig'
import { ConditionList } from '../conditions/ConditionList'

export interface TDecConfig {
  label: string
}

export const getRandomLabel = () => `label-${new Date().getTime()}`

export const AliceGrants = () => {
  // Ethers-js is our web3 provider
  const { library, chainId } = useEthers()

  // Initial config vars
  const [config, setConfig] = useState<Configuration>(undefined as unknown as Configuration)
  const [tDecParams, setTDecParams] = useState<TDecConfig>({ label: '2-of-4-ibex' })

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
  const [decryptionErrors, setDecryptionErrors] = useState([] as string[])

  useEffect(() => {
    // Try setting default config based on currently selected network
    if (chainId) {
      const config = {
        // TODO: Add default config for Ethereum
        // ...defaultConfiguration(chainId),
        porterUri: 'https://porter-ibex.nucypher.community',
        // For local development, uncomment the following line:
        // porterUri: 'http://127.0.0.1:80',
      }
      setConfig(config)
    }
  }, [chainId])

  const fetchTDecConfig = async () => {
    const decrypter = await makeTDecDecrypter(tDecParams.label, config.porterUri)
    const encrypter = await makeTDecEncrypter(tDecParams.label)

    setEncrypter(encrypter)
    setDecrypter(decrypter)

    setPolicyFormEnabled(true)
    setEncryptionEnabled(true)
  }

  const encryptMessage = (plaintext: string) => {
    if (!encrypter || !conditions) {
      return
    }
    encrypter.conditions = conditions
    const encryptedMessage = encrypter.encryptMessage(plaintext)

    setEncryptedMessage(encryptedMessage)
    setDecryptionEnabled(true)
  }

  const decryptMessage = async (ciphertext: MessageKit) => {
    if (!decrypter || !library || !conditions) {
      return
    }
    const web3Provider = new ethers.providers.Web3Provider(library.provider)
    const conditionContext = conditions.buildContext(web3Provider)

    // More extensive flow with manual error handling
    const retrievedMessages = await decrypter.retrieve([ciphertext], conditionContext)
    const decryptedMessages = retrievedMessages.map((mk: PolicyMessageKit) => {
      if (mk.isDecryptableByReceiver()) {
        return decrypter.decrypt(mk)
      }

      // If we are unable to decrypt, we may inspect the errors and handle them
      if (Object.values(mk.errors).length > 0) {
        const ursulasWithErrors: string[] = Object.entries(mk.errors).map(([address, error]) => `${address} - ${error}`)
        setDecryptionErrors(ursulasWithErrors)
      } else {
        setDecryptionErrors([])
      }
      return new Uint8Array()
    })

    setDecryptedMessage(new TextDecoder().decode(decryptedMessages[0]))
  }

  if (!config) {
    return <h1>Loading ...</h1>
  }

  return (
    <div style={{ display: 'grid', padding: '5px' }}>
      <NetworkConfig networkConfig={config} setNetworkConfig={setConfig} />
      <FetchTDecConfig
        enabled={policyFormEnabled}
        tDecParams={tDecParams}
        setDecParams={setTDecParams}
        fetchTDecConfig={fetchTDecConfig}
      />
      <ConditionList enabled={encryptionEnabled} conditions={conditions} setConditions={setConditions} />
      {conditions && (
        <>
          <EnricoEncrypts enabled={encryptionEnabled} encrypt={encryptMessage} encryptedMessage={encryptedMessage} />
          <BobDecrypts
            enabled={decryptionEnabled}
            decrypt={decryptMessage}
            decryptedMessage={decryptedMessage}
            decryptionErrors={decryptionErrors}
          />
        </>
      )}
    </div>
  )
}

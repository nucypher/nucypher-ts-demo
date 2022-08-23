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
import type { Web3Provider } from '@ethersproject/providers'
import { ChainId, useEthers } from '@usedapp/core'
import { ConditionSet } from '@nucypher/nucypher-ts'

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
    porterUri: defaultConfiguration(ChainId.Mumbai).porterUri,
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

  // TODO: Set to undefined
  const [conditions, setConditions] = useState(
    ConditionSet.fromJSON(
      JSON.stringify([
        {
          chain: 'ethereum',
          method: 'ownerOf',
          parameters: [3591],
          standardContractType: 'ERC721',
          returnValueTest: {
            comparator: '==',
            value: '0x6b1231134930FCe469f019ea23907eBa289f8eED',
          },
          contractAddress: '0x1e988ba4692e52Bc50b375bcC8585b95c48AaD77',
        },
      ])
    )
  )

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

  const tDecDemo = async (provider?: Web3Provider) => {
    if (!provider) {
      return
    }

    const decrypter = await makeTDecDecrypter(tDecParams.label, networkConfig.porterUri)
    const encrypter = await makeTDecEncrypter(tDecParams.label)

    setEncrypter(encrypter)
    setDecrypter(decrypter)

    setPolicyFormEnabled(true)
    setEncryptionEnabled(true)
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
    const retrievedMessage = await decrypter.retrieveAndDecrypt([cyphertext])
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
        tDecDemo={() => tDecDemo(library)}
      />
      {conditions && <ConditionList conditions={[conditions]} />}
      <EnricoEncrypts
        enabled={encryptionEnabled}
        encrypt={encryptMessage}
        encryptedMessage={encryptedMessage}
        setConditions={setConditions}
      />
      <BobDecrypts enabled={decryptionEnabled} decrypt={decryptMessage} decryptedMessage={decryptedMessage} />
    </div>
  )
}

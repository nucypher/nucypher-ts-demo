/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Enrico } from 'nucypher-ts'
import type { PolicyMessageKit, PublicKey } from 'nucypher-ts'
import React, { ChangeEvent, useEffect, useState } from 'react'

import { Button } from '../base/Button'
import { UploadPolicyForm } from '../form/UploadPolicyForm'
import { UploadMessageForm } from './UploadMessageForm'
import { mockBob } from '../../mock'

export const BobReceives = () => {
  const [encryptedMessage, setEncryptedMessage] = useState(undefined as PolicyMessageKit | undefined)
  const [senderVerifyingKey, setSenderVerifyingKey] = useState(undefined as PublicKey | undefined)
  const [aliceVerifyingKey, setAliceVerifyingKey] = useState(undefined as PublicKey | undefined)
  const [decryptionDisabled, setDecryptionDisabled] = useState(true)
  const [label, setLabel] = useState('')
  const [policyEncryptingKey, setPolicyEncryptingKey] = useState(undefined as PublicKey | undefined)

  useEffect(() => {
    setDecryptionDisabled(!(aliceVerifyingKey && encryptedMessage && label && policyEncryptingKey))
  }, [aliceVerifyingKey, encryptedMessage, label, policyEncryptingKey])

  const handleUploadPolicy = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()
    fileReader.readAsText(e!.target!.files![0], 'UTF-8')
    fileReader.onload = (e) => {
      const payloadJson = e!.target!.result as string
      const { aliceVerifyingKey, label, policyEncryptingKey } = JSON.parse(payloadJson)
      setAliceVerifyingKey(aliceVerifyingKey)
      setLabel(label)
      setPolicyEncryptingKey(policyEncryptingKey)
    }
  }

  const handleUploadMessage = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()
    fileReader.readAsText(e!.target!.files![0], 'UTF-8')
    fileReader.onload = (e) => {
      const policyJson = e!.target!.result as string
      const { encryptedMessage, senderVerifyingKey } = JSON.parse(policyJson)
      setEncryptedMessage(encryptedMessage)
      setSenderVerifyingKey(senderVerifyingKey)
    }
  }

  const receiveMessageFromAlice = async () => {
    if (!(aliceVerifyingKey && encryptedMessage && label && policyEncryptingKey)) {
      return
    }

    // TODO: Update
    // const bob = mockBob()
    // const retrievedMessage = await bob.retrieveAndDecrypt(policyEncryptingKey, aliceVerifyingKey, [encryptedMessage], policy.treasureMap)
    // console.log({retrievedMessage})
  }

  return (
    <div>
      <UploadPolicyForm handleChange={handleUploadPolicy} />
      <hr></hr>
      <UploadMessageForm handleChange={handleUploadMessage} />
      <hr></hr>
      <Button onClick={receiveMessageFromAlice} disabled={decryptionDisabled}>
        Decrypt message
      </Button>
      <h3>See console for results</h3>
    </div>
  )
}


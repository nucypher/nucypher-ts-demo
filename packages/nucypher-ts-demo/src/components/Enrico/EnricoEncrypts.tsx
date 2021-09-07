/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Enrico } from 'nucypher-ts'
import type { PolicyMessageKit } from 'nucypher-ts'
import React, { useState } from 'react'
import { EncryptInput } from './EncryptInput'

export const EnricoEncrypts = () => {
  const [encryptedMessage, setEncryptedMessage] = useState(undefined as PolicyMessageKit | undefined)

  const encrypt = (plaintext: string) => {
    const policyStr = localStorage.getItem('policy')
    const policy = JSON.parse(policyStr!)
    const enrico = new Enrico(policy.policyEncryptingKey!)
    const encryptedMessage = enrico.encrypt(plaintext)
    setEncryptedMessage(encryptedMessage)
  }

  return (
    <div>
      <EncryptInput encrypt={encrypt} />
      {encryptedMessage ? encryptedMessage : undefined}
    </div>
  )
}

import { MessageKit } from '@nucypher/nucypher-ts'
import React, { useState } from 'react'
import styled from 'styled-components'

import { ContentBlock } from '../base/base'
import { InputRow, Input, SmallButton, TitleRow, CellTitle } from '../form/form'

export const FormRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 32px 0 24px 58px;
`

interface Props {
  enabled: boolean
  decrypt: (ciphertext: MessageKit) => Promise<void>
  decryptedMessage: string
  decryptionErrors: string[]
}

export const BobDecrypts = ({ decrypt, decryptedMessage, enabled, decryptionErrors }: Props) => {
  if (!enabled) {
    return <></>
  }

  const isSingatureSet = () => Object.keys(localStorage).filter((key) => key.includes('wallet-signature')).length > 0

  const [ciphertext, setCiphertext] = useState('')
  const [hasSignature, setHasSignature] = useState(isSingatureSet())

  const onDecrypt = async () => {
    const b64decoded = Buffer.from(ciphertext, 'base64')
    await decrypt(MessageKit.fromBytes(b64decoded))
    setHasSignature(isSingatureSet())
  }

  const plaintextContent = decryptedMessage ? (
    <div style={{ paddingTop: '5px' }}>
      <h2>Plaintext: {decryptedMessage}</h2>
    </div>
  ) : (
    ''
  )

  const ClearSignature = () => {
    if (!hasSignature) {
      return null
    }

    const onClearSignature = () => {
      Object.keys(localStorage)
        .filter((key) => key.includes('wallet-signature'))
        .forEach((key) => localStorage.removeItem(key))
      setHasSignature(false)
    }

    return <SmallButton onClick={onClearSignature}>Clear Signature</SmallButton>
  }

  const DecryptionErrors = () => {
    if (decryptionErrors.length === 0) {
      return null
    }

    return (
      <div>
        <h2>Decryption Errors</h2>
        <p>Not enough cFrags retrieved to open capsule.</p>
        <p>Some Ursulas have failed with errors:</p>
        <ul>
          {decryptionErrors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      <ContentBlock>
        <TitleRow>
          <CellTitle>Step 3 - Bob decrypts encrypted message</CellTitle>
        </TitleRow>
        <InputRow>
          <Input
            id={'decryptionInput'}
            value={ciphertext}
            placeholder="Enter encrypted message"
            onChange={(e) => setCiphertext(e.currentTarget.value)}
          />
        </InputRow>
        <FormRow>
          <SmallButton onClick={onDecrypt}>Decrypt</SmallButton>
        </FormRow>
        <FormRow>{ClearSignature()}</FormRow>
        {plaintextContent}
        {DecryptionErrors()}
      </ContentBlock>
    </div>
  )
}

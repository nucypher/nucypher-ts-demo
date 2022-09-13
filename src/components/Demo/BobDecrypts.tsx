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
  decrypt: (ciphertext: MessageKit) => void
  decryptedMessage: string
}

export const BobDecrypts = ({ decrypt, decryptedMessage, enabled }: Props) => {
  if (!enabled) {
    return <></>
  }

  const [ciphertext, setCiphertext] = useState('')

  const onDecrypt = () => {
    const b64decoded = Buffer.from(ciphertext, 'base64')
    decrypt(MessageKit.fromBytes(b64decoded))
  }

  const plaintextContent = decryptedMessage ? (
    <div style={{ paddingTop: '5px' }}>
      <h3>Plaintext: {decryptedMessage}</h3>
    </div>
  ) : (
    ''
  )

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
        {plaintextContent}
      </ContentBlock>
    </div>
  )
}

import type { MessageKit } from '@nucypher/nucypher-ts'
import React, { useState } from 'react'

import { ContentBlock } from '../base/base'

import { InputRow, Input, SmallButton, TitleRow, CellTitle } from '../form/form'

interface Props {
  enabled: boolean
  encryptedMessage?: MessageKit
  encrypt: (value: string) => void
}

export const EnricoEncrypts = ({ encrypt, encryptedMessage, enabled }: Props) => {
  if (!enabled) {
    return <></>
  }

  const [plaintext, setPlaintext] = useState('test')

  const onClick = () => encrypt(plaintext)

  const ciphertextContent = encryptedMessage ? (
    <div style={{ paddingTop: '5px' }}>
      <h3>Encrypted message: {JSON.stringify(encryptedMessage)}</h3>
    </div>
  ) : (
    ''
  )

  return (
    <div>
      <ContentBlock>
        <TitleRow>
          <CellTitle>Step 2 - Enrico encrypts a message</CellTitle>
        </TitleRow>
        <InputRow>
          <Input
            id={'encryptionInput'}
            type="string"
            value={plaintext}
            onChange={(e) => setPlaintext(e.currentTarget.value)}
          />
          <SmallButton onClick={onClick}>Encrypt</SmallButton>
        </InputRow>
        {ciphertextContent}
      </ContentBlock>
    </div>
  )
}

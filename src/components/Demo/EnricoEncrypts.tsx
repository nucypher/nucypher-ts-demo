import type { MessageKit } from '@nucypher/nucypher-ts'
import React, { useState } from 'react'

import styled from 'styled-components'
import { ContentBlock } from '../base/base'
import { Button } from '../base/Button'
import { CopyButton } from '../base/CopyButton'
import { CellTitle, Input, InputRow, TitleRow } from '../form/form'

export const FormRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 32px 0 24px 58px;
`

interface Props {
  enabled: boolean
  encryptedMessage?: MessageKit
  encrypt: (value: string) => void
}

export const EnricoEncrypts = ({ encrypt, encryptedMessage, enabled }: Props) => {
  if (!enabled) {
    return <></>
  }

  const [plaintext, setPlaintext] = useState('plaintext')

  const onClick = () => encrypt(plaintext)

  const CiphertextContent = () => {
    if (!encryptedMessage) {
      return <></>
    }

    const encodedEncryptedMessage = Buffer.from(encryptedMessage.toBytes()).toString('base64')
    return (
      <div style={{ paddingTop: '5px', width: '720px' }}>
        <h3>
          Encrypted message: <CopyButton data={encodedEncryptedMessage} />{' '}
        </h3>
        <pre className="encryptedMessage">{encodedEncryptedMessage}</pre>
      </div>
    )
  }

  return (
    <div>
      <ContentBlock>
        <TitleRow>
          <CellTitle>Step 2 - Set conditions and Encrypt a message</CellTitle>
        </TitleRow>
        <InputRow>
          <Input
            id={'encryptionInput'}
            type="string"
            value={plaintext}
            onChange={(e) => setPlaintext(e.currentTarget.value)}
          />
        </InputRow>
        <FormRow>
          <Button onClick={onClick}>Encrypt</Button>
        </FormRow>
        {CiphertextContent()}
      </ContentBlock>
    </div>
  )
}

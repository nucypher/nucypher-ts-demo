import React, { useState } from 'react'
import { toBase64 } from '../../utils'
import { ContentBlock } from '../base/base'

import { InputRow, Input, SmallButton, TitleRow, CellTitle } from '../form/form'

interface Props {
  enabled: boolean
  ciphertext?: Uint8Array
  encrypt: (value: string) => void
}

export const EnricoEncrypts = ({ encrypt, ciphertext, enabled }: Props) => {
  if (!enabled) {
    return <></>
  }

  console.log({ ciphertext })

  const [plaintext, setPlaintext] = useState('test')

  const onClick = () => encrypt(plaintext)

  const ciphertextContent = ciphertext ? (
    <div style={{ paddingTop: '5px' }}>
      <h3>Ciphertext (base64): {toBase64(ciphertext)}</h3>
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

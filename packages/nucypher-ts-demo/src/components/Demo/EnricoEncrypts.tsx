import React, { useState } from 'react'

import { InputRow, Input, SmallButton, SmallContentBlock, TitleRow, CellTitle } from '../form/form'

interface Props {
  enabled: boolean
  encrypt: (value: string) => void
}

export const EnricoEncrypts = ({ encrypt, enabled }: Props) => {
  if (!enabled) {
    return <></>
  }

  const [plaintext, setPlaintext] = useState('test')

  const onClick = () => encrypt(plaintext)

  return (
    <div>
      <SmallContentBlock>
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
      </SmallContentBlock>
    </div>
  )
}

import React, { useState } from 'react'

import { InputRow, Input, SmallButton, SmallContentBlock, TitleRow, CellTitle } from '../form/form'

interface EncryptInputProps {
  encrypt: (value: string) => void
}

export const EncryptInput = ({ encrypt }: EncryptInputProps) => {
  const [plaintext, setPlaintext] = useState('test')

  const onClick = () => encrypt(plaintext)

  return (
    <SmallContentBlock>
      <TitleRow>
        <CellTitle>Encrypt message</CellTitle>
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
  )
}

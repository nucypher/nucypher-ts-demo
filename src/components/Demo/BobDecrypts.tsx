import React from 'react'

import { InputRow, Input, SmallButton, SmallContentBlock, TitleRow, CellTitle } from '../form/form'

interface Props {
  enabled: boolean
  decrypt: () => void
  decryptedMessage: string
}

export const BobDecrypts = ({ decrypt, decryptedMessage, enabled }: Props) => {
  if (!enabled) {
    return <></>
  }

  return (
    <div>
      <SmallContentBlock>
        <TitleRow>
          <CellTitle>Step 3 - Bob decrypts encrypted message</CellTitle>
        </TitleRow>
        <InputRow>
          <Input type="string" value={decryptedMessage} disabled={true} />
          <SmallButton onClick={decrypt}>Decrypt</SmallButton>
        </InputRow>
      </SmallContentBlock>
    </div>
  )
}

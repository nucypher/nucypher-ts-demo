import React from 'react'
import { ContentBlock } from '../base/base'

import { InputRow, SmallButton, TitleRow, CellTitle } from '../form/form'

interface Props {
  enabled: boolean
  decrypt: () => void
  decryptedMessage: string
}

export const BobDecrypts = ({ decrypt, decryptedMessage, enabled }: Props) => {
  if (!enabled) {
    return <></>
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
          <SmallButton onClick={decrypt}>Decrypt</SmallButton>
        </InputRow>
        {plaintextContent}
      </ContentBlock>
    </div>
  )
}

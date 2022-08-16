import { MessageKit } from '@nucypher/nucypher-ts'
import React, { useState } from 'react'
import styled from 'styled-components'
import { ContentBlock } from '../base/base'
import { InputBox, InputRow, Input, SmallButton, TitleRow, CellTitle } from '../form/form'

export const FormRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 32px 0 24px 58px;
`

interface Props {
  enabled: boolean
  decrypt: (cyphertext: MessageKit) => void
  decryptedMessage: string
}

export const BobDecrypts = ({ decrypt, decryptedMessage, enabled }: Props) => {
  if (!enabled) {
    return <></>
  }

  const [cyphertext, setCyphertext] = useState('cypher text')

  const onClick = () => decrypt(MessageKit.fromBytes([cyphertext]))

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
            type="number"
            value={cyphertext}
            onChange={(e) => setCyphertext(e.currentTarget.value)}
          />
        </InputRow>
        <FormRow>
          <SmallButton onClick={onClick}>Decrypt</SmallButton>
        </FormRow>
        {plaintextContent}
      </ContentBlock>
    </div>
  )
}

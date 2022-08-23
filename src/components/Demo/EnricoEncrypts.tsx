import type { MessageKit } from '@nucypher/nucypher-ts/build/main/src/core'
import { ConditionSet } from '@nucypher/nucypher-ts'
import React, { useState } from 'react'

import styled from 'styled-components'
import { ContentBlock } from '../base/base'
import { Button } from '../base/Button'
import { InputBox, InputRow, Input, CellTitle, TitleRow } from '../form/form'

export const FormRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 32px 0 24px 58px;
`

interface Props {
  enabled: boolean
  encryptedMessage?: MessageKit
  encrypt: (value: string, conditions: ConditionSet) => void
  setConditions: (value: ConditionSet) => void
}

export const EnricoEncrypts = ({ encrypt, encryptedMessage, enabled, setConditions }: Props) => {
  if (!enabled) {
    return <></>
  }

  const [plaintext, setPlaintext] = useState('plaintext')
  const [conditionsStr, setConditionsStr] = useState('conditions json')

  const onClick = () => encrypt(plaintext, ConditionSet.fromJSON(conditionsStr))

  const ciphertextContent = encryptedMessage ? (
    <div style={{ paddingTop: '5px', width: '720px' }}>
      <h3>Encrypted message: </h3>
      <pre className="encryptedMessage">{Buffer.from(encryptedMessage.toBytes()).toString('base64')}</pre>
    </div>
  ) : (
    ''
  )

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
        <InputBox>
          <Input
            id={'conditionsInput'}
            type="string"
            value={conditionsStr}
            onChange={(e) => {
              setConditionsStr(e.currentTarget.value)
              setConditions(ConditionSet.fromJSON(e.currentTarget.value))
            }}
          />
        </InputBox>
        <FormRow>
          <Button onClick={onClick}>Encrypt</Button>
        </FormRow>
        {ciphertextContent}
      </ContentBlock>
    </div>
  )
}

import React from 'react'
import styled from 'styled-components'

import { Button } from '../base/Button'
import { ContentBlock } from '../base/base'
import { Input, Label, TitleRow, CellTitle } from '../form/form'
import type { TDecConfig } from './TDecConditionsDemo'

export const FormRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 32px 0 24px 58px;
`

interface Props {
  enabled: boolean
  tDecParams: TDecConfig
  setDecParams: (value: TDecConfig) => void
  fetchTDecConfig: () => void
}

export const FetchTDecConfig = ({ enabled, tDecParams, setDecParams, fetchTDecConfig }: Props) => {
  const setLabel = (label: string) => setDecParams({ ...tDecParams, label })

  const content = enabled ? (
    <div style={{ display: 'grid' }}>
      <FormRow>
        <Label htmlFor={'label'}>Label</Label>
        <Input
          id={'encryptionInput'}
          type="string"
          value={tDecParams.label}
          onChange={(e) => setLabel(e.currentTarget.value)}
        />
      </FormRow>
      <FormRow>
        <Button onClick={fetchTDecConfig}>Fetch tDec Config</Button>
      </FormRow>
    </div>
  ) : (
    <>
      <div>
        <h3>Fetching in progress</h3>
        <h3>Please wait ...</h3>
      </div>
    </>
  )

  return (
    <ContentBlock>
      <TitleRow>
        <CellTitle>Step 1 - Fetch tDec configuration</CellTitle>
      </TitleRow>
      {content}
    </ContentBlock>
  )
}

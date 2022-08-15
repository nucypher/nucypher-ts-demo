import React from 'react'
import styled from 'styled-components'

import { Button } from '../base/Button'
import { ContentBlock } from '../base/base'
import { Input, Label, TitleRow, CellTitle } from '../form/form'
import type { ItDecConfig } from './tDec_and_conditions_demo'


export const FormRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 32px 0 24px 58px;
`

interface Props {
  enabled: boolean
  policyParams: ItDecConfig
  setPolicyParams: (value: ItDecConfig) => void
  grantToBob: () => void
}

export const AliceCreatesPolicy = ({ enabled, policyParams, setPolicyParams, grantToBob }: Props) => {
  const setLabel = (label: string) => setPolicyParams({ ...policyParams, label })
  const setShares = (shares: number) => setPolicyParams({ ...policyParams, shares: shares > 0 ? shares : 1 })
  const setThreshold = (threshold: number) =>
    setPolicyParams({ ...policyParams, threshold: threshold > 0 ? threshold : 1 })
  const setStartDate = (startDate: Date) => setPolicyParams({ ...policyParams, startDate })
  const setEndDate = (endDate: Date) => setPolicyParams({ ...policyParams, endDate })

  const content = enabled ? (
    <div style={{ display: 'grid' }}>
      <FormRow>
        <Label htmlFor={'label'}>Label</Label>
        <Input
          id={'encryptionInput'}
          type="string"
          value={policyParams.label}
          onChange={(e) => setLabel(e.currentTarget.value)}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor={'shares'}>Shares</Label>
        <Input
          id={'n'}
          type="number"
          value={policyParams.shares}
          onChange={(e) => setShares(parseInt(e.currentTarget.value))}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor={'threshold'}>Threshold</Label>
        <Input
          id={'m'}
          type="number"
          value={policyParams.threshold}
          onChange={(e) => setThreshold(parseInt(e.currentTarget.value))}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor={'startDate'}>Start date</Label>
        <Input
          id={'startDate'}
          type="datetime-local"
          value={policyParams.startDate?.toISOString().split('Z')[0]}
          onChange={(e) => setStartDate(new Date(Date.parse(e.currentTarget.value)))}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor={'endDate'}>End date</Label>
        <Input
          id={'endDate'}
          type="datetime-local"
          value={policyParams.endDate.toISOString().split('Z')[0]}
          onChange={(e) => setEndDate(new Date(Date.parse(e.currentTarget.value)))}
        />
      </FormRow>
      <FormRow>
        <Button onClick={grantToBob}>Build tDec Entities</Button>
      </FormRow>
    </div>
  ) : (
    <>
      <div>
        <h3>Creation in progress</h3>
        <h3>Please wait ...</h3>
      </div>
    </>
  )

  return (
    <ContentBlock>
      <TitleRow>
        <CellTitle>Step 1 - Define tDec configuration</CellTitle>
      </TitleRow>
      {content}
    </ContentBlock>
  )
}

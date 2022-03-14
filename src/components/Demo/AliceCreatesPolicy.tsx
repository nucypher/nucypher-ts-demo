import type { BlockchainPolicyParameters } from '@nucypher/nucypher-ts'
import React from 'react'
import styled from 'styled-components'

import { Button } from '../base/Button'
import { ContentBlock } from '../base/base'
import { Input, Label, TitleRow, CellTitle } from '../form/form'

export const FormRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 32px 0 24px 58px;
`

interface Props {
  enabled: boolean
  policyParams: BlockchainPolicyParameters
  setPolicyParams: (value: BlockchainPolicyParameters) => void
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
        <Button onClick={grantToBob}>Create policy</Button>
      </FormRow>
    </div>
  ) : (
    <>
      <div>
        <h3>Policy creation in progress</h3>
        <h3>Please wait ...</h3>
      </div>
    </>
  )

  return (
    <ContentBlock>
      <TitleRow>
        <CellTitle>Step 1 - Alice creates a blockchain policy</CellTitle>
      </TitleRow>
      {content}
    </ContentBlock>
  )
}

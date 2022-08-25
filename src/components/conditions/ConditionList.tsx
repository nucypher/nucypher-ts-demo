import { ConditionSet } from '@nucypher/nucypher-ts'
import React, { useState } from 'react'

import { ContentBlock } from '../base/base'
import { TitleRow, CellTitle } from '../form/form'
import { ConditionBuilder } from './ConditionBuilder'

interface Props {
  conditions?: ConditionSet
  setConditions: (value: ConditionSet) => void
}

export const ConditionList = ({ conditions, setConditions }: Props) => {
  const enableOperator = (conditions && conditions.conditions.length > 0) || false

  const addConditions = (newConditions: Array<Record<string, string>>) => {
    const existingConditions = conditions ? conditions.conditions : []
    const updatedConditions = [...existingConditions, ...newConditions] as any // TODO: Fix this type cast
    setConditions(new ConditionSet(updatedConditions))
  }

  const ConditionList = conditions ? (
    <div>
      <pre>
        <code>{JSON.stringify(conditions.conditions, null, 2)}</code>
      </pre>
    </div>
  ) : (
    <></>
  )

  return (
    <ContentBlock>
      <TitleRow>
        <CellTitle>Policy Conditions</CellTitle>
      </TitleRow>
      <div>
        <ConditionBuilder addConditions={addConditions} enableOperator={enableOperator} />
        {ConditionList}
      </div>
    </ContentBlock>
  )
}

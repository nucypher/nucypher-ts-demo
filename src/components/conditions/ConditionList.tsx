import { ConditionSet } from '@nucypher/nucypher-ts'
import React, { useState } from 'react'

import { ContentBlock } from '../base/base'
import { TitleRow, CellTitle } from '../form/form'
import { ConditionBuilder } from './ConditionBuilder'

interface Props {
  conditionSet?: ConditionSet
}

export const ConditionList = (props: Props) => {
  const [conditionSet, setConditionSet] = useState(props.conditionSet)
  const enableOperator = conditionSet && conditionSet.conditions.length > 0

  const addCondition = (conditions: Array<Record<string, string>>) => {
    const existingConditions = conditionSet ? conditionSet.conditions : []
    const newConditions = [...existingConditions, ...conditions] as any // TODO: Fix this type cast
    console.log({ conditions })
    console.log({ newConditions })
    const newConditionSet = new ConditionSet(newConditions)
    console.log({ newConditionSet })
    setConditionSet(newConditionSet)
  }


  const ConditionList = conditionSet ? (
    <div >
      <pre>
        <code>{JSON.stringify(conditionSet.conditions, null, 2)}</code>
      </pre>
    </div>
  ): <></>

  return (
    <ContentBlock>
      <TitleRow>
        <CellTitle>Policy Conditions</CellTitle>
      </TitleRow>
      <div>
        <ConditionBuilder addCondition={addCondition} enableOperator={enableOperator} />
        {ConditionList}
      </div>
    </ContentBlock>
  )
}

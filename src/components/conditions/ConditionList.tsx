import { ConditionSet } from '@nucypher/nucypher-ts'
import React, { useState } from 'react'

import { ContentBlock } from '../base/base'
import { TitleRow, CellTitle } from '../form/form'
import { ConditionOrOperator } from './Condition'
import { ConditionBuilder } from './ConditionBuilder'

interface Props {
  conditions?: ConditionSet
}

export const ConditionList = (props: Props) => {
  const [conditions, setConditions] = useState(props.conditions)

  const addCondition = (condition: ConditionSet) => {
    const newConditions = [...condition.conditions, condition] as any // TODO: Fix this type cast
    setConditions(new ConditionSet(newConditions))
  }

  console.log({ conditions })
  const getList = () => {
    return (conditions ? conditions.conditions : []).map((condition, index) => {
      return (
        <div key={index}>
          <ConditionOrOperator conditionOrOperator={condition} />
        </div>
      )
    })
  }

  return (
    <ContentBlock>
      <TitleRow>
        <CellTitle>Policy Conditions</CellTitle>
      </TitleRow>
      <div>
        <ConditionBuilder addCondition={addCondition} enableOperator={true} />
        {getList()}
      </div>
    </ContentBlock>
  )
}

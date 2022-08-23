import type { ConditionSet } from '@nucypher/nucypher-ts'
import React, { useState } from 'react'

import { ContentBlock } from '../base/base'
import { TitleRow, CellTitle } from '../form/form'
import { Condition } from './Condition'
import { ConditionBuilder } from './ConditionBuilder'

interface Props {
  conditions: ConditionSet[]
}

export const ConditionList = (props: Props) => {
  const [conditions, setConditions] = useState(props.conditions)

  const addCondition = (condition: ConditionSet) => {
    setConditions([...conditions, condition])
  }

  console.log({ conditions })
  const getList = () => {
    return conditions.map((condition, index) => {
      return (
        <div key={index}>
          <Condition condition={condition} />
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
        <ConditionBuilder addCondition={addCondition} />
        {getList()}
      </div>
    </ContentBlock>
  )
}

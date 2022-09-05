import { ConditionSet, Conditions } from '@nucypher/nucypher-ts'
import React from 'react'

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
    const updatedContitionSet = new ConditionSet(updatedConditions)
    setConditions(updatedContitionSet)
    console.log({ updatedContitionSet: updatedContitionSet.toJson() })
  }

  // TODO: Use proper types instead of `unknown` once namespaces in `nucypher-ts` are fixed
  const Condition = (cond: unknown) => {
    if (cond instanceof Conditions.Condition) {
      return JSON.stringify(cond.value, null, 2)
    }
    return JSON.stringify(cond, null, 2)
  }

  const ConditionList = conditions ? (
    <div>
      <pre>
        {conditions.conditions.map((condition, index) => (
          <div key={index}>{Condition(condition)}</div>
        ))}
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

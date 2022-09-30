import { ConditionSet, Conditions, Condition } from '@nucypher/nucypher-ts'
import React, { useState } from 'react'

import { ContentBlock } from '../base/base'
import { TitleRow, CellTitle } from '../form/form'
import { ConditionBuilder } from './ConditionBuilder'

interface Props {
  conditions?: ConditionSet
  setConditions: (value: ConditionSet) => void
  enabled: boolean
}

export const ConditionList = ({ conditions, setConditions, enabled }: Props) => {
  const enableOperator = (conditions && conditions.conditions.length > 0) || false
  const [showHackZone, setHackZone] = useState(false)
  const [error, setError] = useState(false)
  const [hackContents, setHackContents] = useState('')

  const saveHack = (value: string) => {
    try {
      const conditionSetFromJson = ConditionSet.fromJSON(value)
      setConditions(conditionSetFromJson)
    } catch {
      setError(true)
    }
  }

  const addCondition = (condition: Condition, operator?: { operator: string }) => {
    const newConditions = operator ? [condition, operator] : [condition]
    const existingConditions = conditions ? conditions.conditions : []
    const updatedConditions = [...existingConditions, ...newConditions] as any // TODO: Fix this type cast
    const updatedContitionSet = new ConditionSet(updatedConditions)
    setConditions(updatedContitionSet)
    setHackContents(updatedContitionSet.toJson())
  }

  // TODO: Use proper types instead of `unknown` once namespaces in `nucypher-ts` are fixed
  const Condition = (cond: unknown) => {
    if (cond instanceof Conditions.Condition) {
      return JSON.stringify(cond.toObj(), null, 2)
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

      <h4
        onClick={() => {
          setHackZone(!showHackZone)
        }}
      >
        toggle hacking
      </h4>
      {showHackZone ? (
        <div>
          <textarea
            defaultValue={hackContents}
            onChange={(e) => {
              saveHack(e.currentTarget.value)
            }}
            style={{ width: 100 + '%', height: 300 + 'px', border: `1px solid ${error ? 'red' : 'black'}` }}
          ></textarea>
        </div>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  )

  if (!enabled) {
    return <></>
  }

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

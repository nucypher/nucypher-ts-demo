import type { Conditions } from '@nucypher/nucypher-ts'
import React from 'react'

interface Props {
  conditionOrOperator: Conditions.Condition | Conditions.Operator
}

export const ConditionOrOperator = (props: Props) => (
  <pre>
    <code>{JSON.stringify(JSON.parse(props.conditionOrOperator.toJSON()), null, 2)}</code>
  </pre>
)

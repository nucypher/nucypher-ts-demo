import type { ConditionSet } from '@nucypher/nucypher-ts'
import React from 'react'

interface Props {
  condition: ConditionSet
}

export const Condition = (props: Props) => (
  <pre>
    <code>{JSON.stringify(JSON.parse(props.condition.toJSON()), null, 2)}</code>
  </pre>
)

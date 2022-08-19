import type { ConditionSet } from '@nucypher/nucypher-ts'
import React from 'react'

interface Props {
    condition: ConditionSet;
}

export const Condition = (props: Props) => {
    return (
        <div>
            {props.condition.toJSON()}
        </div>
    )
}

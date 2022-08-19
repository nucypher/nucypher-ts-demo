import type { ConditionSet } from '@nucypher/nucypher-ts'
import React from 'react'
import { Condition } from './Condition'

interface Props {
    conditions: ConditionSet[];
}

export const ConditionList = (props: Props) => {
    const getList = () => {
        return props.conditions.map((condition, index) => {
            return (
                <div key={index}>
                    <Condition condition={condition} />
                </div>
            )
        })
    }

    return (
        <div>
            {getList()}
        </div>
    )
}

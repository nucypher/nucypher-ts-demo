import type { ConditionSet } from '@nucypher/nucypher-ts'
import React from 'react'
import { ContentBlock } from '../base/base'
import { TitleRow, CellTitle } from '../form/form'
import { Condition } from './Condition'
import { ConditionBuilder } from './ConditionBuilder'

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
        <ContentBlock>
            <TitleRow>
                <CellTitle>Policy Conditions</CellTitle>
            </TitleRow>
            <div>
                <ConditionBuilder />
                {getList()}
            </div>
        </ContentBlock>

    )
}

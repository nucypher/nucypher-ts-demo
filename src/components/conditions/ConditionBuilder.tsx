import React, { useState } from 'react'
import { useForm } from 'react-hook-form'


export const ConditionBuilder = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (data: any) => console.log(data)
    console.log(errors)

    const makeDropdown = (
        name: string,
        items: string[],
        required = true,
        onChange = (e: any) => console.log(e)
    ) => {
        const optionItems = items.map((elem, index) => <option key={index} value={elem}>{elem}</option>)
        return (
            <select {...register(name, { required, onChange: (e: any) => onChange(e.target.value) })}>
                {optionItems}
            </select>
        )
    }

    const [logicalOperator, setLogicalOperator] = useState(undefined)
    const [conditionType, setConditionType] = useState(undefined)
    const [comparator, setComparator] = useState(undefined)
    const [rpcMethod, setRpcMethod] = useState(undefined)

    const LOGICAL_OPERATORS = ['AND', 'OR']
    const LogicalOperator = makeDropdown('logicalOperator', LOGICAL_OPERATORS, true, setLogicalOperator)

    const CONDITION_TYPES = ["timelock", "rpc", "evm"]
    const ConditionType = makeDropdown("ConditionType", CONDITION_TYPES, true, setConditionType)

    const COMPARATOR_OPERATORS = ["==", ">", "<", ">=", "<="] // TODO: Is "!=" supported?
    const Comparator = makeDropdown("Comparator", COMPARATOR_OPERATORS, true, setComparator)

    const RPC_METHODS = ["eth_getBalance", "balanceOf"]
    const RpcMethod = makeDropdown("RpcMethod", RPC_METHODS, true, setRpcMethod)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {LogicalOperator}
            <p>LogicalOperator: {logicalOperator}</p>
            <br />

            {ConditionType}
            <p>ConditionType: {conditionType}</p>
            <br />

            {Comparator}
            <p>Comparator: {comparator}</p>
            <br />

            <input type="number" placeholder="TimelockValue" {...register("TimelockValue", {})} />

            {RpcMethod}
            <p>RpcMethod: {rpcMethod}</p>
            <br />

            <input type="number" placeholder="RpcValue" {...register("RpcValue", {})} />

            <input type="text" placeholder="EvmContractAddress" {...register("EvmContractAddress", { required: true })} />

            <input type="submit" />
        </form>
    )


}
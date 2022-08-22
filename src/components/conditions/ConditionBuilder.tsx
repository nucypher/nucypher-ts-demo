import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export const ConditionBuilder = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (data: any) => console.log(data)
    console.log(errors)

    // Defining all dictionary values for the form
    // Doing that for the conveniance of not having to use `undefined` etc., in `useState`
    const LOGICAL_OPERATORS = ['AND', 'OR']
    const CONDITION_TYPES = ["timelock", "rpc", "evm"]
    const COMPARATOR_OPERATORS = ["==", ">", "<", ">=", "<="] // TODO: Is "!=" supported?
    const RPC_METHODS = ["eth_getBalance", "balanceOf"]
    const STANDARD_CONTRACT_TYPES = ["erc20", "erc721", "erc115"]
    const METHOD_TYPES_PER_CONTRACT_TYPE: Record<string, string[]> = {
        "erc20": ["balanceOf"],
        "erc721": ["balanceOf"],
        "erc115": ["balanceOf"],
    }
    const METHOD_PARAMETERS_PER_METHOD_TYPE: Record<string, string[]> = {
        // TODO: Defined using context interface?
        "balanceOf": ["address"],
    }

    const [logicalOperator, setLogicalOperator] = useState(LOGICAL_OPERATORS[0])
    const [conditionType, setConditionType] = useState(CONDITION_TYPES[0])
    const [comparator, setComparator] = useState(COMPARATOR_OPERATORS[0])
    const [rpcMethod, setRpcMethod] = useState(RPC_METHODS[0])
    const [standardContractType, setStandardContractType] = useState(STANDARD_CONTRACT_TYPES[0])
    const [contractMethod, setContractMethod] = useState(METHOD_TYPES_PER_CONTRACT_TYPE[standardContractType][0])
    const [contractMethodParameters, setContractMethodParameters] = useState(METHOD_PARAMETERS_PER_METHOD_TYPE[contractMethod][0])
    const [returnTestValue, setReturnTestValue] = useState(0)
    const [parameterValue, setParameterValue] = useState('')
    const [contractAddress, setContractAddress] = useState('')

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

    const LogicalOperatorDropdown = makeDropdown('logicalOperator', LOGICAL_OPERATORS, true, setLogicalOperator)
    const ConditionTypeDropdown = makeDropdown("ConditionType", CONDITION_TYPES, true, setConditionType)
    const ComparatorDropdown = makeDropdown("Comparator", COMPARATOR_OPERATORS, true, setComparator)
    const RpcMethodDropdown = makeDropdown("RpcMethod", RPC_METHODS, true, setRpcMethod)
    const StandardContractTypeDropdown = makeDropdown("StandardContractType", STANDARD_CONTRACT_TYPES, true, setStandardContractType)
    const ContractMethodDropdown = makeDropdown("ContractMethod", METHOD_TYPES_PER_CONTRACT_TYPE[standardContractType], true, setContractMethod)
    const ContractMethodParametersDropdown = makeDropdown("ContractMethodParameters", METHOD_PARAMETERS_PER_METHOD_TYPE[contractMethod], true, setContractMethodParameters)

    const makeInput = (name: string, type: "text" | "number", onChange = (e: any) => console.log(e)) =>
        (<input type={type} {...register(name, { onChange: (e: any) => onChange(e.target.value) })} />)

    const ReturnTestValueInput = makeInput("ReturnTestValue", "number", setReturnTestValue)
    const ParametersValueInput = makeInput("ParameterValue", "text", setParameterValue)
    const ContractAddressInput = makeInput("ContractAddress", "text", setContractAddress)

    const TimelockCondition = (
        <div style={{ display: 'grid' }}>
            <h2>Timelock Condition</h2>
            <p>Return Value Test {ComparatorDropdown} Value {ReturnTestValueInput} </p>
            <p><b>Timelock {comparator} {returnTestValue}</b></p>
        </div>
    )
    const RpcCondition = (
        <div>
            <h2>RPC Method Condition</h2>
            <p>Method {RpcMethodDropdown}</p>
            <p>Return Value Test {ComparatorDropdown} Value {ReturnTestValueInput}</p>
            <p>Parameters {ContractMethodParametersDropdown} Value {ParametersValueInput}</p>
            <p><b>RPC Method {rpcMethod}({parameterValue}) {comparator} {returnTestValue}</b></p>
        </div>
    )
    const EvmCondition = (
        <div>
            <h2>EVM Condition</h2>
            <p>Contract Address {ContractAddressInput}</p>
            <p>Standard Contract Type {StandardContractTypeDropdown}</p>
            <p>Method {ContractMethodDropdown}</p>
            <p>Return Value Test {ComparatorDropdown} Value {ReturnTestValueInput} </p>
            <p>Parameters {ContractMethodParametersDropdown} Value {ParametersValueInput}</p>
            <p><b>Contract {standardContractType}({contractAddress}) {contractMethod}({contractMethodParameters}={parameterValue}) {comparator} {returnTestValue}</b></p>
        </div>
    )

    const ComponentForConditionType = (type: string | undefined) => {
        switch (type) {
            case "timelock":
                return TimelockCondition
            case "rpc":
                return RpcCondition
            case "evm":
                return EvmCondition
            default:
                return <h1>Select a condition type</h1>
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {LogicalOperatorDropdown}
            <p>LogicalOperator: {logicalOperator}</p>
            <br />

            {ConditionTypeDropdown}
            <p>ConditionType: {conditionType}</p>
            <br />

            {ComponentForConditionType(conditionType)}
            <br />

            <input type="submit" />
        </form>
    )


}
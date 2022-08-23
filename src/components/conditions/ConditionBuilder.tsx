import { ConditionSet } from '@nucypher/nucypher-ts'
import React, { useState } from 'react'
import { Button } from '../base/Button'

interface Props {
    addCondition: (condition: ConditionSet) => void
}

export const ConditionBuilder = ({ addCondition }: Props) => {

    // Defining all dictionary values for the form
    // Doing that for the conveniance of not having to use `undefined` etc., in `useState`
    // TODO: These should be exposed by `nucypher-ts` 
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
    const [returnValueTest, setReturnValueTest] = useState(0)
    const [parameterValue, setParameterValue] = useState('')
    const [contractAddress, setContractAddress] = useState('')

    const makeDropdown = (
        items: string[],
        onChange = (e: any) => console.log(e)
    ) => {
        const optionItems = items.map((elem, index) => <option key={index} value={elem}>{elem}</option>)
        return (
            <select onChange={(e) => onChange(e.target.value)}>
                {optionItems}
            </select >
        )
    }

    const LogicalOperatorDropdown = makeDropdown(LOGICAL_OPERATORS, setLogicalOperator)
    const ConditionTypeDropdown = makeDropdown(CONDITION_TYPES, setConditionType)
    const ComparatorDropdown = makeDropdown(COMPARATOR_OPERATORS, setComparator)
    const RpcMethodDropdown = makeDropdown(RPC_METHODS, setRpcMethod)
    const StandardContractTypeDropdown = makeDropdown(STANDARD_CONTRACT_TYPES, setStandardContractType)
    const ContractMethodDropdown = makeDropdown(METHOD_TYPES_PER_CONTRACT_TYPE[standardContractType], setContractMethod)
    const ContractMethodParametersDropdown = makeDropdown(METHOD_PARAMETERS_PER_METHOD_TYPE[contractMethod], setContractMethodParameters)

    const makeInput = (type: "text" | "number", onChange = (e: any) => console.log(e)) =>
        (<input type={type} onChange={(e: any) => onChange(e.target.value)} />)

    const ReturnValueTestInput = makeInput("number", setReturnValueTest)
    const ParametersValueInput = makeInput("text", setParameterValue)
    const ContractAddressInput = makeInput("text", setContractAddress)

    const TimelockCondition = (
        <div style={{ display: 'grid' }}>
            <h2>Timelock Condition</h2>
            <p>Return Value Test {ComparatorDropdown} Value {ReturnValueTestInput} </p>
            <p><b>Timelock {comparator} {returnValueTest}</b></p>
        </div>
    )
    const RpcCondition = (
        <div>
            <h2>RPC Method Condition</h2>
            <p>Method {RpcMethodDropdown}</p>
            <p>Return Value Test {ComparatorDropdown} Value {ReturnValueTestInput}</p>
            <p>Parameters {ContractMethodParametersDropdown} Value {ParametersValueInput}</p>
            <p><b>RPC Method {rpcMethod}({parameterValue}) {comparator} {returnValueTest}</b></p>
        </div>
    )
    const EvmCondition = (
        <div>
            <h2>EVM Condition</h2>
            <p>Contract Address {ContractAddressInput}</p>
            <p>Standard Contract Type {StandardContractTypeDropdown}</p>
            <p>Method {ContractMethodDropdown}</p>
            <p>Return Value Test {ComparatorDropdown} Value {ReturnValueTestInput} </p>
            <p>Parameters {ContractMethodParametersDropdown} Value {ParametersValueInput}</p>
            <p><b>Contract {standardContractType}({contractAddress}) {contractMethod}({contractMethodParameters}={parameterValue}) {comparator} {returnValueTest}</b></p>
        </div>
    )

    const ComponentForConditionType = (type: string) => {
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

    const makeConditonForType = (type: string) => {
        // TODO: Use schema validation implemented by nucypher-ts
        switch (type) {
            case "timelock":
                return {
                    returnValueTest: {
                        comparator,
                        value: returnValueTest
                    }
                }
            case "rpc":
                return {
                    chain: "ethereum", // TODO: Get from web3 provider or from form input?
                    method: rpcMethod,
                    parameters: [parameterValue],
                    returnValueTest: {
                        comparator,
                        value: returnValueTest
                    }
                }
            case "evm":
                return {
                    contractAddress,
                    chain: "ethereum", // TODO: Get from web3 provider or from form input?
                    functionAbi: "", // TODO: Where do I get this from?
                    method: contractMethod,
                    parameters: [parameterValue],
                    returnValueTest: {
                        comparator,
                        value: returnValueTest
                    }
                }
            default:
                throw Error(`Unrecognized condition type ${conditionType}`)
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        // TODO: Condition set is already a list of stuff, how do I manage?
        const condition = ConditionSet.fromList([makeConditonForType(conditionType)])
        console.log({ condition })
        addCondition(condition)
    }

    return (
        <form>
            {LogicalOperatorDropdown}
            <p>LogicalOperator: {logicalOperator}</p>
            <br />

            {ConditionTypeDropdown}
            <p>ConditionType: {conditionType}</p>
            <br />

            {ComponentForConditionType(conditionType)}
            <br />

            <Button onClick={onSubmit}>Add Condition</Button>
        </form>
    )


}
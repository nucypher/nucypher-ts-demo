import { Conditions } from '@nucypher/nucypher-ts'
import { Operator } from '@nucypher/nucypher-ts/build/main/src/policies/conditions'
import React, { useState } from 'react'

import { Button } from '../base/Button'

interface Props {
  addConditions: (conditions: Array<Record<string, string>>) => void
  enableOperator: boolean
}

export const ConditionBuilder = ({ addConditions, enableOperator }: Props) => {
  const { LOGICAL_OPERATORS } = Conditions.Operator
  const CONDITION_TYPES = [
    Conditions.TimelockCondition.CONDITION_TYPE,
    Conditions.ContractCondition.CONDITION_TYPE,
    Conditions.RpcCondition.CONDITION_TYPE,
  ]
  const { COMPARATOR_OPERATORS } = Conditions.Condition
  const { RPC_METHODS } = Conditions.RpcCondition
  const { STANDARD_CONTRACT_TYPES, METHODS_PER_CONTRACT_TYPE, PARAMETERS_PER_METHOD } = Conditions.ContractCondition

  const [logicalOperator, setLogicalOperator] = useState(LOGICAL_OPERATORS[0])
  const [conditionType, setConditionType] = useState(CONDITION_TYPES[0])
  const [comparator, setComparator] = useState(COMPARATOR_OPERATORS[0])
  const [rpcMethod, setRpcMethod] = useState(RPC_METHODS[0])
  const [standardContractType, setStandardContractType] = useState(STANDARD_CONTRACT_TYPES[0])
  const [contractMethod, setContractMethod] = useState(METHODS_PER_CONTRACT_TYPE[standardContractType][0])
  const [contractMethodParameters, setContractMethodParameters] = useState(PARAMETERS_PER_METHOD[contractMethod][0])
  const [returnValueTest, setReturnValueTest] = useState(0)
  const [parameterValue, setParameterValue] = useState('')
  const [contractAddress, setContractAddress] = useState('')

  const makeDropdown = (items: readonly string[], onChange = (e: any) => console.log(e)) => {
    const optionItems = items.map((elem, index) => (
      <option key={index} value={elem}>
        {elem}
      </option>
    ))
    return <select onChange={(e) => onChange(e.target.value)}>{optionItems}</select>
  }

  const LogicalOperatorDropdown = makeDropdown(LOGICAL_OPERATORS, setLogicalOperator)
  const ConditionTypeDropdown = makeDropdown(CONDITION_TYPES, setConditionType)
  const ComparatorDropdown = makeDropdown(COMPARATOR_OPERATORS, setComparator)
  const RpcMethodDropdown = makeDropdown(RPC_METHODS, setRpcMethod)
  const StandardContractTypeDropdown = makeDropdown(STANDARD_CONTRACT_TYPES, setStandardContractType)
  const ContractMethodDropdown = makeDropdown(METHODS_PER_CONTRACT_TYPE[standardContractType], setContractMethod)
  const ContractMethodParametersDropdown = makeDropdown(
    PARAMETERS_PER_METHOD[contractMethod],
    setContractMethodParameters
  )

  const makeInput = (type: 'text' | 'number', onChange = (e: any) => console.log(e)) => (
    <input type={type} onChange={(e: any) => onChange(e.target.value)} />
  )

  const ReturnValueTestInput = makeInput('number', setReturnValueTest)
  const ParametersValueInput = makeInput('text', setParameterValue)
  const ContractAddressInput = makeInput('text', setContractAddress)

  const TimelockCondition = (
    <div style={{ display: 'grid' }}>
      <h2>Timelock Condition</h2>
      <p>
        Return Value Test {ComparatorDropdown} Value {ReturnValueTestInput}{' '}
      </p>
      <p>
        <b>
          Timelock {comparator} {returnValueTest}
        </b>
      </p>
    </div>
  )
  const RpcCondition = (
    <div>
      <h2>RPC Method Condition</h2>
      <p>Method {RpcMethodDropdown}</p>
      <p>
        Parameters {ContractMethodParametersDropdown} Value {ParametersValueInput}
      </p>
      <p>
        Return Value Test {ComparatorDropdown} Value {ReturnValueTestInput}
      </p>
      <p>
        <b>
          RPC Method {rpcMethod}({parameterValue}) {comparator} {returnValueTest}
        </b>
      </p>
    </div>
  )
  const EvmCondition = (
    <div>
      <h2>EVM Condition</h2>
      <p>Contract Address {ContractAddressInput}</p>
      <p>Standard Contract Type {StandardContractTypeDropdown}</p>
      <p>Method {ContractMethodDropdown}</p>
      <p>
        Parameters {ContractMethodParametersDropdown} Value {ParametersValueInput}
      </p>
      <p>
        Return Value Test {ComparatorDropdown} Value {ReturnValueTestInput}{' '}
      </p>
      <p>
        <b>
          Contract {standardContractType}({contractAddress}) {contractMethod}({contractMethodParameters}=
          {parameterValue}) {comparator} {returnValueTest}
        </b>
      </p>
    </div>
  )

  const ComponentForConditionType = (type: string) => {
    switch (type) {
      case 'timelock':
        return TimelockCondition
      case 'rpc':
        return RpcCondition
      case 'evm':
        return EvmCondition
      default:
        return <h1>Select a condition type</h1>
    }
  }

  const makeConditonForType = (type: string): Record<string, any> => {
    switch (type) {
      case 'timelock':
        return new Conditions.TimelockCondition({
          returnValueTest: {
            comparator,
            value: returnValueTest,
          },
        })
      case 'rpc':
        return new Conditions.RpcCondition({
          chain: 'ethereum', // TODO: Get from web3 provider or from form input?
          method: rpcMethod,
          parameters: [parameterValue],
          returnValueTest: {
            comparator,
            value: returnValueTest,
          },
        })
      case 'evm':
        return new Conditions.ContractCondition({
          contractAddress,
          chain: 'ethereum', // TODO: Get from web3 provider or from form input?
          functionAbi: '', // TODO: Where do I get this from?
          method: contractMethod,
          parameters: [parameterValue],
          returnValueTest: {
            comparator,
            value: returnValueTest,
          },
        })
      default:
        throw Error(`Unrecognized condition type ${conditionType}`)
    }
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    // TODO: Condition set is already a list of stuff, how do I manage?
    const conditions = []
    if (enableOperator) {
      conditions.push(new Operator(logicalOperator))
    }
    conditions.push(makeConditonForType(conditionType))
    addConditions(conditions)
  }

  return (
    <form>
      {enableOperator && (
        <>
          {LogicalOperatorDropdown}
          <p>LogicalOperator: {logicalOperator}</p>
          <br />
        </>
      )}

      {ConditionTypeDropdown}
      <p>ConditionType: {conditionType}</p>
      <br />

      {ComponentForConditionType(conditionType)}
      <br />

      <Button onClick={onSubmit}>Add Condition</Button>
    </form>
  )
}

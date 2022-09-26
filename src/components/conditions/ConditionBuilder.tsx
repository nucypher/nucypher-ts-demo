import { Operator, Conditions, Condition } from '@nucypher/nucypher-ts'
import { useEthers } from '@usedapp/core'
import React, { useState } from 'react'

import { Button } from '../base/Button'

interface Props {
  addConditions: (conditions: Array<Record<string, string>>) => void
  enableOperator: boolean
}

export const ConditionBuilder = ({ addConditions, enableOperator }: Props) => {
  const { library } = useEthers()
  if (!library) {
    return null
  }

  const { LOGICAL_OPERATORS } = Conditions.Operator
  // const PREBUILT_CONDITIONS: Record<string, unknown> = {
  //   ERC721Ownership: new Conditions.ERC721Ownership(),
  // }
  const CONDITION_TYPES = [
    Conditions.TimelockCondition.CONDITION_TYPE,
    Conditions.EvmCondition.CONDITION_TYPE,
    Conditions.RpcCondition.CONDITION_TYPE,
  ]
  const { COMPARATOR_OPERATORS } = Condition
  const { RPC_METHODS } = Conditions.RpcCondition
  const { METHODS_PER_CONTRACT_TYPE, PARAMETERS_PER_METHOD } = Conditions.EvmCondition
  const STANDARD_CONTRACT_TYPES = ['ERC20', 'ERC721'] // TODO: Get from nucypher-ts once EIP1155 is supported

  const [logicalOperator, setLogicalOperator] = useState(LOGICAL_OPERATORS[0])
  // const [prebuiltCondition, setPrebuiltCondition] = useState(Object.keys(PREBUILT_CONDITIONS)[0])
  const [conditionType, setConditionType] = useState(CONDITION_TYPES[0])
  const [comparator, setComparator] = useState(COMPARATOR_OPERATORS[0])
  const [rpcMethod, setRpcMethod] = useState(RPC_METHODS[0])
  const [standardContractType, setStandardContractType] = useState(STANDARD_CONTRACT_TYPES[0])
  const [contractMethod, setContractMethod] = useState(METHODS_PER_CONTRACT_TYPE[standardContractType][0])
  const [contractMethodParameters, setContractMethodParameters] = useState(PARAMETERS_PER_METHOD[contractMethod][0])
  const [returnValueTest, setReturnValueTest] = useState('')
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
  const onSetContractMethod = (method: string) => {
    setContractMethod(method)
    // TODO: Do this once we actually have methods to select from
    // const contextParams = Conditions.EvmCondition.CONTEXT_PARAMETERS_PER_METHOD[method]
    // if (contextParams) {
    //   setParameterValue(contextParams[0])
    // }
    setContractMethodParameters(PARAMETERS_PER_METHOD[method][0])
  }

  const onSetRpcMethod = (method: string) => {
    setRpcMethod(method)
    // TODO: Do this once we actually have methods to select from
    // const contextParams = Conditions.RpcCondition.CONTEXT_PARAMETERS_PER_METHOD[method]
    // if (contextParams) {
    //   setParameterValue(contextParams[0])
    // }
  }

  const onSetStandardContractType = (type: string) => {
    setStandardContractType(type)
    setContractMethod(METHODS_PER_CONTRACT_TYPE[type][0])
    setContractMethodParameters(PARAMETERS_PER_METHOD[METHODS_PER_CONTRACT_TYPE[type][0]][0])
  }

  const LogicalOperatorDropdown = makeDropdown(LOGICAL_OPERATORS, setLogicalOperator)
  // const PrebuiltConditionDropdown = makeDropdown(Object.keys(PREBUILT_CONDITIONS), setPrebuiltCondition)
  const ConditionTypeDropdown = makeDropdown(CONDITION_TYPES, setConditionType)
  const ComparatorDropdown = makeDropdown(COMPARATOR_OPERATORS, setComparator)
  const RpcMethodDropdown = makeDropdown(RPC_METHODS, onSetRpcMethod)
  const StandardContractTypeDropdown = makeDropdown(STANDARD_CONTRACT_TYPES, onSetStandardContractType)
  const ContractMethodDropdown = makeDropdown(METHODS_PER_CONTRACT_TYPE[standardContractType], onSetContractMethod)
  const ContractMethodParametersDropdown = makeDropdown(
    PARAMETERS_PER_METHOD[contractMethod],
    setContractMethodParameters
  )

  const makeInput = (type: 'text' | 'number', onChange = (e: any) => console.log(e)) => (
    <input type={type} onChange={(e: any) => onChange(e.target.value)} />
  )

  const ReturnValueTestInput = makeInput('text', setReturnValueTest)
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
    // TODO: Capitalizing is required
    const capitalizeFirstLetter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
    const chain = capitalizeFirstLetter(library.network.name)
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
          chain,
          method: rpcMethod,
          parameters: [parameterValue],
          returnValueTest: {
            comparator,
            value: returnValueTest,
          },
        })
      case 'evm':
        return new Conditions.EvmCondition({
          contractAddress,
          chain,
          // functionAbi: '', // TODO: Support user-provided `functionAbi`
          standardContractType,
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

  const addConditionAndMaybeOperator = (condition: Record<string, any> | Condition) => {
    // TODO: Condition set is already a list of stuff, how do I manage?
    const conditionAndMaybeOperator = []
    if (enableOperator) {
      conditionAndMaybeOperator.push(new Operator(logicalOperator))
    }
    conditionAndMaybeOperator.push(condition)
    addConditions(conditionAndMaybeOperator)
  }

  // const onAddPrebuiltCondition = (e: any) => {
  //   e.preventDefault()
  //   const prebuilt = PREBUILT_CONDITIONS[prebuiltCondition] as Condition
  //   addConditionAndMaybeOperator(prebuilt)
  // }

  const onAddNewCondition = (e: any) => {
    e.preventDefault()
    const condition = makeConditonForType(conditionType)
    addConditionAndMaybeOperator(condition)
  }

  return (
    <form>
      {enableOperator && (
        <>
          <h2>Select Logical Operator</h2>
          {LogicalOperatorDropdown}
          <br />
        </>
      )}

      {/* <div style={{ display: 'grid' }}>
        <h2>Select Prebuilt Condition</h2>
        {PrebuiltConditionDropdown}
        <br />

        <Button onClick={onAddPrebuiltCondition}>Add Prebuilt</Button>
      </div> */}

      <div style={{ display: 'grid' }}>
        <h2>Build New Condition</h2>
        {ConditionTypeDropdown}
        <br />

        {ComponentForConditionType(conditionType)}
        <br />

        <Button onClick={onAddNewCondition}>Add New</Button>
      </div>
    </form>
  )
}

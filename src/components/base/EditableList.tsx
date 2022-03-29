import React, { useState } from 'react'
import { Input, InputRow } from '../form/form'

interface Props {
  list: string[]
  onListChange: (newList: string[]) => void
  validateInput: (value: string) => boolean
  placeholder: string
}

// Based on: https://github.com/arpitbatra123/react-list-editable

export const EditableList = (props: Props) => {
  const { onListChange, placeholder, validateInput } = props
  const [list, setList] = useState(props.list)
  const [inputValue, setInputValue] = useState('')

  const arrayRemove = (arr: string[], s: string) => arr.filter((v) => v !== s)

  const handleListItemChange = (event: any, index: number) => {
    const value = event.target.value
    let newList = [...list]
    if (value != '') {
      newList[index] = value
    } else {
      newList = arrayRemove(newList, newList[index])
    }
    setList(newList)
    onListChange(newList)
  }

  const getList = () => {
    return list.map((elem, index) => {
      return (
        <InputRow key={index}>
          <Input value={elem} placeholder={placeholder} onChange={(e) => handleListItemChange(e, index)} />
        </InputRow>
      )
    })
  }

  const onChange = (event: any) => {
    setInputValue(event.target.value)
  }

  const onKeyUp = (event: any) => {
    const value = event.target.value
    if (list.includes(value)) {
      return
    }
    if (event.key !== 'Enter' || !validateInput(value)) {
      return
    }
    const newList = [...list].concat(value)
    setList(newList)
    onListChange(newList)
    setInputValue('')
  }

  return (
    <div style={{ display: 'list' }}>
      {getList()}
      <InputRow>
        <Input
          name="newInput"
          className="input-field new-input-field"
          onChange={onChange}
          onKeyUp={onKeyUp}
          placeholder="Press Enter to add"
          value={inputValue}
        />
      </InputRow>
    </div>
  )
}

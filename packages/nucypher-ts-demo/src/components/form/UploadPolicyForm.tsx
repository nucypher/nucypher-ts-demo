import React, { ChangeEvent } from 'react'

import { Label, SmallContentBlock, TitleRow, CellTitle, LabelRow } from './form'

interface UploadPolicyFormProps {
  handleChange(e: ChangeEvent<HTMLInputElement>): void
}

export const UploadPolicyForm = ({ handleChange }: UploadPolicyFormProps) => {
  return (
    <SmallContentBlock>
      <TitleRow>
        <CellTitle>Upload policy</CellTitle>
      </TitleRow>
      <LabelRow>
        <Label htmlFor={'policy'}>Policy</Label>
      </LabelRow>
      {/* TODO: Make file input into proper component */}
      <input id={'policy'} type={'file'} onChange={handleChange} />
    </SmallContentBlock>
  )
}

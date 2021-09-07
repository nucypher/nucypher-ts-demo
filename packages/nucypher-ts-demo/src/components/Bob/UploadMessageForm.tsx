import React, { ChangeEvent } from 'react'

import { Label, SmallContentBlock, TitleRow, CellTitle, LabelRow } from '../form/form'

interface UploadMessageFormProps {
  handleChange(e: ChangeEvent<HTMLInputElement>): void
}

export const UploadMessageForm = ({ handleChange }: UploadMessageFormProps) => {
  return (
    <SmallContentBlock>
      <TitleRow>
        <CellTitle>Upload encrypted message</CellTitle>
      </TitleRow>
      <LabelRow>
        <Label htmlFor={'encryptedMessage'}>Encrypted message</Label>
      </LabelRow>
      {/* TODO: Make file input into proper component */}
      <input id={'encryptedMessage'} type={'file'} onChange={handleChange} />
    </SmallContentBlock>
  )
}

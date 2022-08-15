import React from 'react'
import { ethers } from 'ethers'

import { ContentBlock } from '../base/base'
import { EditableList } from '../base/EditableList'
import { Label, Input, CellTitle, TitleRow } from '../form/form'
import { FormRow } from './fetchConfig'
import type { INetworkConfig } from './tDec_and_conditions_demo'
interface Props {
  networkConfig: INetworkConfig
  setNetworkConfig: (value: INetworkConfig) => void
}

export const NetworkConfig = ({ networkConfig, setNetworkConfig }: Props) => {
  const setPorterUri = (porterUri: string) => setNetworkConfig({ ...networkConfig, porterUri })

  const validateAddress = (maybeAddress: string) => ethers.utils.isAddress(maybeAddress)

  return (
    <ContentBlock>
      <TitleRow>
        <CellTitle>Step 0 - Configure NuCypher Network Settings</CellTitle>
      </TitleRow>
      <div style={{ display: 'grid' }}>
        <FormRow>
          <Label htmlFor={'porterUri'}>Porter URI</Label>
          <Input
            id={'porterUri'}
            type="string"
            value={networkConfig.porterUri}
            onChange={(e) => setPorterUri(e.currentTarget.value)}
          />
        </FormRow>
      </div>
    </ContentBlock>
  )
}

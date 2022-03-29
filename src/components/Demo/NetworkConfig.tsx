import React from 'react'
import { ethers } from 'ethers'

import { ContentBlock } from '../base/base'
import { EditableList } from '../base/EditableList'
import { Label, Input, CellTitle, TitleRow } from '../form/form'
import { FormRow } from './AliceCreatesPolicy'
import type { INetworkConfig } from './AliceGrants'
interface Props {
  networkConfig: INetworkConfig
  setNetworkConfig: (value: INetworkConfig) => void
}

export const NetworkConfig = ({ networkConfig, setNetworkConfig }: Props) => {
  const setPorterUri = (porterUri: string) => setNetworkConfig({ ...networkConfig, porterUri })
  const setIncludeUrsulas = (includeUrsulas: string[]) => setNetworkConfig({ ...networkConfig, includeUrsulas })
  const setExcludeUrsulas = (excludeUrsulas: string[]) => setNetworkConfig({ ...networkConfig, excludeUrsulas })

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
        <FormRow>
          <Label htmlFor={'includeUrsulas'}>Include Ursulas</Label>
          <EditableList
            list={networkConfig.includeUrsulas}
            onListChange={setIncludeUrsulas}
            validateInput={validateAddress}
            placeholder="Enter a valid checksum address"
          />
        </FormRow>
        <FormRow>
          <Label htmlFor={'excludeUrsulas'}>Exclude Ursulas</Label>
          <EditableList
            list={networkConfig.excludeUrsulas}
            onListChange={setExcludeUrsulas}
            validateInput={validateAddress}
            placeholder="Enter a valid checksum address"
          />
        </FormRow>
      </div>
    </ContentBlock>
  )
}

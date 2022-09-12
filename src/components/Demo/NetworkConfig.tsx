import React from 'react'

import { ContentBlock } from '../base/base'
import { Label, Input, CellTitle, TitleRow } from '../form/form'
import { FormRow } from './FetchConfig'
import type { INetworkConfig } from './TDecConditionsDemo'
interface Props {
  networkConfig: INetworkConfig
  setNetworkConfig: (value: INetworkConfig) => void
}

export const NetworkConfig = ({ networkConfig, setNetworkConfig }: Props) => {
  const setPorterUri = (porterUri: string) => setNetworkConfig({ ...networkConfig, porterUri })

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

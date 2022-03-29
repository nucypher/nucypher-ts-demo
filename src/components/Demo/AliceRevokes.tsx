import React from 'react'

import { ContentBlock } from '../base/base'
import { SmallButton, SmallContentBlock, TitleRow, CellTitle, InputRow } from '../form/form'

interface Props {
  revoke: () => void
  enabled: boolean
  inProgress: boolean
}

export const AliceRevokes = ({ revoke, enabled, inProgress }: Props) => {
  if (!enabled) {
    return <></>
  }

  const content = inProgress ? (
    <>
      <SmallContentBlock>
        <h3>Policy revocation in progress</h3>
        <h3>Please wait ...</h3>
      </SmallContentBlock>
    </>
  ) : (
    <>
      <InputRow>
        <SmallButton onClick={revoke}>Revoke</SmallButton>
      </InputRow>
      <div style={{ paddingTop: '5px' }}>
        <h3>Tip: Try encrypting and decrypting a message after revoking the policy.</h3>
      </div>
    </>
  )

  return (
    <div>
      <ContentBlock>
        <TitleRow>
          <CellTitle>Step 4 - Alice revokes policy</CellTitle>
        </TitleRow>
        {content}
      </ContentBlock>
    </div>
  )
}

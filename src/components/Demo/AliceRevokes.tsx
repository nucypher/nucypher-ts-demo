import React from 'react'

import { SmallButton, SmallContentBlock, TitleRow, CellTitle } from '../form/form'

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
      <div>
        <h2>Policy revocation in progress</h2>
        <h3>Please wait ...</h3>
      </div>
    </>
  ) : (
    <SmallButton onClick={revoke}>Revoke</SmallButton>
  )

  return (
    <div>
      <SmallContentBlock>
        <TitleRow>
          <CellTitle>Step 4 - Alice revokes policy</CellTitle>
          <h3>(Try encrypting and decrypting after revoking)</h3>
        </TitleRow>
        {content}
      </SmallContentBlock>
    </div>
  )
}

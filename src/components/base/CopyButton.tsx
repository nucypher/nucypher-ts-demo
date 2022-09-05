import React, { useState } from 'react'
import copyToClipboard from 'copy-to-clipboard'
import { CheckCircleOutlined, CopyOutlined } from '@ant-design/icons'

export const CopyButton = (props: { data: string }) => {
  const [success, setSuccess] = useState(false)

  const copy = () => {
    copyToClipboard(props.data)
    setSuccess(true)
    // Switch back to `copy` icon after 2 seconds.
    setTimeout(() => setSuccess(false), 2000)
  }

  if (success) {
    return <CheckCircleOutlined onClick={copy} />
  }
  return <CopyOutlined onClick={copy} />
}

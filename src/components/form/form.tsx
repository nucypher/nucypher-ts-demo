import styled from 'styled-components'
import { motion } from 'framer-motion'

import { TextBold } from '../../typography/Text'
import { ContentBlock } from '../base/base'
import { Button } from '../base/Button'
import { BorderRad, Colors } from '../../global/styles'

export const SmallButton = styled(Button)`
  display: flex;
  justify-content: center;
  min-width: 95px;
  height: unset;
  padding: 8px 24px;

  &:disabled {
    color: ${Colors.Gray['600']};
    cursor: unset;
  }

  &:disabled:hover,
  &:disabled:focus {
    background-color: unset;
    color: unset;
  }
`

export const Input = styled.input`
  height: 100%;
  width: 280px;
  padding: 0 0 0 24px;
  display: flex;
  margin: 0 auto;
  color: ${Colors.Gray['600']};
  align-items: center;
  border: ${Colors.Gray['300']} 1px solid;
  border-radius: ${BorderRad.m};
  overflow: hidden;

  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: transparent auto 1px;
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 2px ${Colors.Black['900']};
  }
`

export const CellTitle = styled(TextBold)`
  font-size: 18px;
`

export const InputRow = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 10px;
  color: ${Colors.Gray['600']};
  align-items: center;
  border-radius: ${BorderRad.m};
  overflow: hidden;
`


export const InputBox = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 10px;
  color: ${Colors.Gray['600']};
  align-items: center;
  border-radius: ${BorderRad.m};
  overflow: hidden;
`

export const LabelRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px 0 24px 0;
`

export const Label = styled.label`
  font-weight: 700;
`

export const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-bottom: ${Colors.Gray['300']} 1px solid;
  padding: 16px;
`

export const SmallContentBlock = styled(ContentBlock)`
  padding: 0;
`

export const IconContainer = styled.div`
  margin-right: 15px;
  height: 40px;
  width: 40px;
  float: left;
`

export const InformationRow = styled(motion.div)`
  height: 60px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: auto;
`

export const AnimationWrapper = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  margin: 10px;
`

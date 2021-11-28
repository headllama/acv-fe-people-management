import styled, { css } from 'styled-components'
import { ListItem, Link } from '@chakra-ui/react'

export const WrapperBox = styled.div`
  display: flex;
  width: 100%;
`
export const LeftSide = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 100px;
`

export const RightSide = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const WrapperListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  margin-bottom: 26px;
`
type CircleProps = {
  active?: boolean
  lastChild?: boolean
}
export const Circle = styled.div<CircleProps>`
  ${({ active, lastChild }) => css`
    width: 16px;
    height: 16px;
    background: ${active ? '#FF4F4F' : '#F3F0F5'};
    border-radius: 12px;
    margin-right: 16px;
    position: relative;
    z-index: 2;
    min-width: 16px;
    min-height: 16px;
    &::after {
      content: '';
      width: 2px;
      height: 46px;
      background: ${lastChild ? '' : '#F3F0F5'};
      position: absolute;
      top: 16px;
      left: 7px;
      z-index: 1;
    }
  `}
`

export const BackButton = styled(Link)`
  display: flex;
  align-items: center;
`
export const WrapperFooter = styled.div`
  display: flex;
  margin-top: 20px;
  float: right;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

export const Divider = styled.div`
  width: 1px;
  height: 724px;
  background: #d7d0d9;
  margin: 0 80px;
`
export const WrapperDependentsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`

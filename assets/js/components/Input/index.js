import React from 'react'
import styled from 'styled-components'
import { colors, typography as typo } from 'theme'

const Wrapper = styled.div`
  margin-bottom: 26px;
`

export const InnerInput = styled.input`
  display: inline-block;
  width: 100%;
  height: 64px;
  padding: 0 16px;
  border: none;
  outline: none;
  font-family: ${typo.fonts.body};
  font-size: ${typo.sizes.xxxlarge.font};
  line-height: ${typo.sizes.xxxlarge.lineHeight};
`

const PositioningAnchor = styled.div`
  display: inline-block;
  position: absolute;
  width: 0;
  height: 67px;
`

export const ErrorMessage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 64px;
  padding: 16px;
  background-color: ${colors.coralRed500};
  color: white;
  white-space: nowrap;
  line-height: 32px;
`

const Input = (props) => {
  const {
    name,
    placeholder,
    type = 'text',
    value,
    onChange,
    errorMessage,
  } = props

  return (
    <Wrapper>
      <InnerInput
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />

      {errorMessage &&
        <PositioningAnchor>
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </PositioningAnchor>}
    </Wrapper>
  )
}

export default Input

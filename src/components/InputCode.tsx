'use client'
import React, { useEffect, useRef, useState } from 'react'

export type InputCodeProps = {
  value: string
  setValue: (value: string) => void
  codeLength?: number
}

const CELL_COUNT = 6

const InputCode = ({
  value,
  setValue,
  codeLength = CELL_COUNT
}: InputCodeProps) => {
  const [code, setCode] = useState('')
  const [containerIsFocused, setContainerIsFocused] = useState(false)

  const codeDigitsArray = new Array(codeLength).fill(0)
  const ref = useRef(null)

  const toDigitInput = (_value: number, idx: number) => {
    const emptyInputChar = ' '
    const digit = code?.[idx] || emptyInputChar

    const isCurrentDigit = idx === code?.length
    const isLastDigit = idx === codeLength - 1
    const isCodeFull = code?.length === codeLength

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull)
    const containerStyle =
      containerIsFocused && isFocused
        ? 'codeInputCellContainer inputContainerFocused'
        : 'codeInputCellContainer'

    return (
      <div key={idx} className={containerStyle}>
        {digit}
      </div>
    )
  }

  const handleOnPress = () => {
    setContainerIsFocused(true)
    ref?.current?.focus()
  }

  const handleSetValue = (code: string) => {
    setValue?.(code)
    setCode?.(code)
  }

  const handleOnBlur = () => {
    setContainerIsFocused(false)
  }

  // Effects

  useEffect(() => {
    setContainerIsFocused(true)
    ref?.current?.focus()
  }, [])

  return (
    <div className="container">
      <div className="inputsContainer" onClick={handleOnPress}>
        {codeDigitsArray.map(toDigitInput)}
      </div>
      <input
        ref={ref}
        value={code}
        onChange={(e) => handleSetValue(e.target.value)}
        onBlur={handleOnBlur}
        type="number"
        maxLength={CELL_COUNT}
        className="hiddenCodeInput"
      />
    </div>
  )
}

export default InputCode

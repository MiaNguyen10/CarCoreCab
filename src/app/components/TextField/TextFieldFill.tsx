/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@mui/material'
import React from 'react'
import { FieldError } from 'react-hook-form'

export interface TextFieldFillProps {
  value: any
  onChange: (...event: any[]) => void
  error?: FieldError
  isView?: boolean
  width?: number
}

const TextFieldFill = ({ value, width, onChange, error, isView }: TextFieldFillProps) => {
  return (
    <TextField
      type="text"
      id="outlined-basic"
      variant="outlined"
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error ? error.message : null}
      autoComplete="off"
      InputProps={{
        sx: { height: 44, width: { width } },
      }}
      disabled={isView}
    />
  )
}

export default TextFieldFill


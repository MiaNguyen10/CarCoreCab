import { Box, TextField, TextFieldProps } from '@mui/material'
import { styled } from '@mui/system'
import { LabelTypo } from 'app/components'
import * as React from 'react'
import { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface ILabelledInput<T> {
  name: string
  title: string
  type?: string
  rules?: RegisterOptions
  register?: UseFormRegister<T>
  errors?: FieldErrors<T>
  disabled?: boolean
  label?: string
  required?: boolean
}

export const StyleInput = styled(TextField)(() => ({
  '& .MuiInputBase-input': {
    borderRadius: 3,
    position: 'relative',
    fontSize: 16,
    width: 300,
    padding: 0,
    height: 44,
    paddingLeft: 20,
  },
  '& .MuiSelect-select': {
    height: 33,
    width: 268,
    paddingTop: '11px',
  },
}))

const LabelledInput = <T extends FieldValues>({
  errors,
  name,
  title,
  register,
  rules,
  required,
  children,
  ...rest
}: ILabelledInput<T> & TextFieldProps) => {
  const { t } = useTranslation()
  const error = errors && errors[name]
  const errorMessage = error?.message?.toString() ?? ''

  return (
    <Box>
      <LabelTypo htmlFor={`labelled-input-${name}`} desc={title} required={required || !!rules?.required} />
      <StyleInput
        id={`labelled-input-${name}`}
        error={!!error}
        helperText={error && t(errorMessage)}
        {...(register && register(name as Path<T>, rules))}
        {...rest}
      >
        {children}
      </StyleInput>
    </Box>
  )
}

export default LabelledInput

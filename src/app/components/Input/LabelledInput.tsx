import * as React from 'react'
import { styled } from '@mui/system'
import { Box, FormControl, InputLabel, TextField, TextFieldProps, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

interface ILabelledInput<T> {
  name: string
  title: string
  type?: string
  rules?: RegisterOptions
  register?: UseFormRegister<T>
  errors?: FieldErrors<T>
  disabled?: boolean
  label?: string
}

const StyleInput = styled(TextField)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(6),
  },
  '& .MuiInputBase-input': {
    borderRadius: 3,
    position: 'relative',
    fontSize: 16,
    height: 44,
    width: 300,
    padding: 0,
    paddingLeft: 20,
  },
}))

const RequiredMark = () => {
  return <span style={{ color: 'red' }}>*</span>
}

const LabelledInput = <T extends FieldValues>({
  errors,
  name,
  title,
  register,
  rules,
  ...rest
}: ILabelledInput<T> & TextFieldProps) => {
  const { t } = useTranslation()
  const error = errors && errors[name]
  const errorMessage = error?.message?.toString() ?? ''

  return (
    <Box>
      <FormControl variant="standard">
        <InputLabel htmlFor={`labelled-input-${name}`}>
          <Typography variant="h4">
            {title} {rules?.required && <RequiredMark />}
          </Typography>
        </InputLabel>
        <StyleInput
          id={`labelled-input-${name}`}
          error={!!error}
          helperText={error ? t(errorMessage) : ' '}
          {...(register && register(name as Path<T>, rules))}
          {...rest}
        />
      </FormControl>
    </Box>
  )
}

export default LabelledInput


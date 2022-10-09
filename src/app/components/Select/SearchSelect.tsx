import React from 'react'
import { Autocomplete, Box, TextField } from '@mui/material'
import SelectVector from 'app/assets/icons/SelectVector'

export interface ISearchSelectProps {
  options: string[]
  value: string
  onChange: (newValue: string) => void
  width?: number
  isDisabled?: boolean
}
const SearchSelect = ({ options, value, onChange, width, isDisabled }: ISearchSelectProps): JSX.Element => {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option): string => option}
      openOnFocus
      value={value}
      popupIcon={<SelectVector />}
      isOptionEqualToValue={(option, value) => value === '' || option === value}
      onChange={(_event, newValue): void => {
        onChange(newValue ?? '')
      }}
      renderOption={(optionProps, option): JSX.Element => (
        <Box component="li" {...optionProps}>
          {option}
        </Box>
      )}
      renderInput={(params): JSX.Element => <TextField {...params} placeholder="Select" />}
      sx={{
        width: width,
        '.MuiOutlinedInput-root': {
          padding: '3px 50px 3px 9px',
        },
      }}
      disabled={isDisabled}
    />
  )
}

export default SearchSelect


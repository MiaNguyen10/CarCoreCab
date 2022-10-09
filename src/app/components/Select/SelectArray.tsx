/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuItem, Select } from '@mui/material'
import SelectVector from 'app/assets/icons/SelectVector'
import React from 'react'
import { FieldError } from 'react-hook-form'

export interface SelectProps {
  value: string
  onChange: (...event: any[]) => void
  error?: FieldError
  isView?: boolean
  selectArray?: (string | undefined)[]
  width?: number
}

const ITEM_HEIGHT = 50
const ITEM_PADDING_TOP = 5
const ITEM_DISPLAY_ON_SELECT = 4
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * ITEM_DISPLAY_ON_SELECT + ITEM_PADDING_TOP,
    },
  },
}

const SelectArray: React.FC<SelectProps> = ({ value, onChange, error, selectArray, width }) => {
  return (
    <Select
      id="select"
      value={value}
      onChange={onChange}
      error={!!error}
      fullWidth
      MenuProps={MenuProps}
      size="small"
      IconComponent={SelectVector}
      sx={{ paddingRight: 1, width: { width } }}
    >
      {selectArray?.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SelectArray


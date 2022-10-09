/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MenuItem, Select } from '@mui/material'
import SelectVector from 'app/assets/icons/SelectVector'
import { SelectAddStatus } from 'app/config/Constant'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MenuProps, SelectProps } from './SelectArray'

const SelectStatusDetail = ({ value, onChange, error, isView }: SelectProps) => {
  const { t } = useTranslation()

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
      sx={{ paddingRight: 1, width: 320 }}
      disabled={isView}
    >
      {SelectAddStatus.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {t(option.name!)}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SelectStatusDetail


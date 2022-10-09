import { MenuItem, Select, Typography } from '@mui/material'
import SelectVector from 'app/assets/icons/SelectVector'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MenuProps, SelectProps } from 'app/components/Select/SelectArray'

const SelectArray: React.FC<SelectProps> = ({ value, onChange, error, selectArray, width }) => {
  const { t } = useTranslation()

  return (
    <Select
      displayEmpty
      value={value}
      onChange={onChange}
      error={!!error}
      size="small"
      sx={{ width: width ? { width } : 320, paddingRight: 1 }}
      IconComponent={SelectVector}
      renderValue={(selected) => {
        if (selected.length === 0) {
          return <Typography variant="h6">{t('SELECT_ARRAY')}</Typography>
        }

        return selected
      }}
      MenuProps={MenuProps}
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


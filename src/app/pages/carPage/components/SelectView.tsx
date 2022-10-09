import { MenuItem, Select, Typography } from '@mui/material'
import SelectVector from 'app/assets/icons/SelectVector'
import { MenuProps, SelectProps } from 'app/components/Select/SelectArray'
import { ViewTags } from 'app/config/Data'
import React from 'react'
import { useTranslation } from 'react-i18next'

const SelectView = ({ value, onChange, error, width }: SelectProps) => {
  const { t } = useTranslation()

  return (
    <Select
      id="select_view"
      value={value}
      onChange={onChange}
      error={!!error}
      fullWidth
      MenuProps={MenuProps}
      size="small"
      IconComponent={SelectVector}
      sx={{ paddingRight: 1, width: { width } }}
      displayEmpty
      renderValue={value !== '' ? undefined : () => <Typography variant="h6">{t('SELECT_ARRAY')}</Typography>}
    >
      {ViewTags.map((option, index) => (
        <MenuItem key={index} value={option}>
          {t(option)}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SelectView


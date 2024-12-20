/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MenuItem, Select } from '@mui/material'
import { MenuProps, SelectProps } from 'app/components/Select/SelectArray'
import { SelectAllCarStatus } from 'app/config/Constant'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const SelectVectorForStatus = () => {
  return (
    <svg width="22" height="15" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        // eslint-disable-next-line max-len
        d="M6.64641 8.9213L0.573195 2.84805C0.280289 2.55514 0.280289 2.08027 0.573195 1.78739L1.28154 1.07905C1.57395 0.786641 2.04785 0.786079 2.34095 1.0778L7.17676 5.89095L12.0125 1.0778C12.3056 0.786079 12.7795 0.786641 13.0719 1.07905L13.7803 1.78739C14.0732 2.0803 14.0732 2.55517 13.7803 2.84805L7.7071 8.9213C7.4142 9.21417 6.93932 9.21417 6.64641 8.9213Z"
        fill="#BBBBBB"
      />
    </svg>
  )
}

const SelectCarStatus: React.FC<SelectProps> = ({ value, onChange, error }) => {
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
      IconComponent={SelectVectorForStatus}
      sx={{ paddingRight: 1 }}
    >
      {SelectAllCarStatus.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {t(option.name!)}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SelectCarStatus


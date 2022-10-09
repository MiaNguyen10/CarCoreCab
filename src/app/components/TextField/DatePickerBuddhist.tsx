/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField, TextFieldProps } from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { CaseForDay } from 'cores/utils/CaseForDay'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import React from 'react'
import { FieldError } from 'react-hook-form'

dayjs.locale('th')
dayjs.extend(buddhistEra)

export const dateFormats = {
  year: 'BBBB',
  monthAndYear: 'MMMM BBBB',
}

interface DatePickerProps {
  onChange: (...event: any[]) => void
  value: any
  error?: FieldError
  width: number
}

const DatePickerBuddhist = ({ value, onChange, error, width }: DatePickerProps) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th" dateFormats={dateFormats}>
        <MobileDatePicker
          inputFormat="DD MMMM BBBB"
          value={value}
          onChange={onChange}
          showToolbar={false}
          closeOnSelect
          renderInput={(params: TextFieldProps): JSX.Element => (
            <TextField
              {...params}
              sx={{
                '.MuiInputBase-input': { width: { width }, height: 10 },
              }}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          componentsProps={{
            actionBar: {
              actions: ['clear', 'today'],
            },
          }}
          dayOfWeekFormatter={(day: string): string => {
            return CaseForDay(day)
          }}
        />
      </LocalizationProvider>
    </>
  )
}

export default DatePickerBuddhist


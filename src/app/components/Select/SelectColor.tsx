import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { Chip, ListItemText, MenuItem, Select, SelectChangeEvent, styled } from '@mui/material'
import SelectVector from 'app/assets/icons/SelectVector'
import { Colors } from 'app/config/Data'
import React from 'react'
import { FieldError } from 'react-hook-form'

const ITEM_HEIGHT = 50
const ITEM_PADDING_TOP = 5
const ITEM_DISPLAY_ON_SELECT = 3

const ChipStyle = styled(Chip)({
  borderRadius: 2,
  backgroundColor: '#F7F7F7',
  padding: '6px 8px',
  margin: '-2px 5px 0 0',
})

interface SelectColorProps {
  error?: FieldError
  colorChecked?: string[]
  handleChange: (event: SelectChangeEvent<string[]>) => void
  onChange: (e: SelectChangeEvent<string[]>) => void
  handleDelete: (e: React.MouseEvent, value: string) => void
}

const SelectColor = ({ colorChecked, handleChange, onChange, handleDelete, error }: SelectColorProps) => {
  return (
    <Select
      multiple
      value={colorChecked}
      error={!!error}
      onChange={(e) => {
        handleChange(e)
        onChange(e)
      }}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * ITEM_DISPLAY_ON_SELECT + ITEM_PADDING_TOP,
          },
        },
        sx: {
          '&& .Mui-selected': {
            backgroundColor: '#D9E1E5',
            '&:hover': {
              backgroundColor: '#D9E1E5',
            },
          },
        },
      }}
      IconComponent={SelectVector}
      sx={{ paddingRight: 1, width: 280, height: 44 }}
      renderValue={(selected) => (
        <div>
          {selected.map((value) => (
            <ChipStyle
              key={value}
              label={value}
              clickable
              deleteIcon={<ClearIcon onMouseDown={(event) => event.stopPropagation()} fontSize="small" />}
              onDelete={(e) => handleDelete(e, value)}
            />
          ))}
        </div>
      )}
    >
      {Colors.map((color) => (
        <MenuItem key={color} value={color}>
          <ListItemText primary={color} />
          {colorChecked?.includes(color) ? <CheckIcon sx={{ color: '#0C5E96' }} /> : null}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SelectColor


import { styled, TextField } from '@mui/material'

const FormInput = styled(TextField)({
  paddingTop: 0,
  width: '320px',
  height: '50px',
  '.MuiInputLabel-root': {
    zIndex: 0,
    top: '-25px',
    fontSize: '16px',
    fontWeight: 700,
    color: '#333333',
    WebkitTransform: 'none',
    span: {
      color: '#D93A39',
    },
    '&.Mui-focused': {
      color: '#333333',
    },
    '&.Mui-error': {
      color: '#333333',
    },
  },
  '.MuiOutlinedInput-notchedOutline': {
    maxHeight: '55px',
    legend: {
      maxWidth: 0,
    },
  },
})

export default FormInput


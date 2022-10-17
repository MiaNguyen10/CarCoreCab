import { createTheme } from '@mui/material'
import shadows, { Shadows } from '@mui/material/styles/shadows'

const theme = createTheme({
  shadows: shadows.map(() => 'none') as Shadows,
  palette: {
    primary: {
      main: '#00A950',
      contrastText: 'white',
    },
    secondary: {
      main: '#BBBBBB',
      contrastText: 'white',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1440,
      xl: 1536,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          color: '#333333',
        },
      },
      variants: [
        {
          props: { variant: 'h1' },
          style: {
            fontWeight: 600,
            fontSize: '32px',
            color: '#012336',
          },
        },
        {
          props: { variant: 'h2' },
          style: {
            fontWeight: 600,
            fontSize: '24px',
            color: '#FFFFFF',
          },
        },
        {
          props: { variant: 'h3' },
          style: {
            fontWeight: 400,
            fontSize: '20px',
          },
        },
        {
          props: { variant: 'h4' },
          style: {
            fontWeight: 700,
            fontSize: '16px',
            color: '#333333',
          },
        },
        {
          props: { variant: 'h5' },
          style: {
            fontWeight: 400,
            fontSize: '14px',
            color: 'white',
          },
        },
        {
          props: { variant: 'h6' },
          style: {
            fontWeight: 500,
            fontSize: '16px',
            color: '#888888',
          },
        },
        {
          props: { variant: 'subtitle1' },
          style: {
            fontWeight: 400,
            fontSize: '0.75rem',
            color: '#d32f2f',
            margin: '3px 14px',
          },
        },
        {
          props: { variant: 'subtitle2' },
          style: {
            fontWeight: 400,
            fontSize: 18,
            color: '#012336',
          },
        },
        {
          props: { variant: 'button' },
          style: {
            fontWeight: 900,
          },
        },
      ],
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: 'flex',
          height: '80px',
          paddingLeft: '60px',
          paddingRight: '60px',
          justifyContent: 'space-between',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          border: 'none',
          outline: 'none',
          textTransform: 'capitalize',
          transition: 'none',
          pointerEvents: 'visibleFill',
          borderRadius: 2,
          fontWeight: 900,
          height: '44px',
          minWidth: '88px',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            background: '#00A950',
            height: '44px',
            fontSize: '14px',
            '&:hover': {
              backgroundColor: '#00A950',
            },
          },
        },
        {
          props: { variant: 'contained', color: 'error' },
          style: {
            background: '#E53F3F',
            color: 'white',
            '&:hover': {
              backgroundColor: '#E53F3F',
            },
          },
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            background: '#BBBBBB',
            color: 'white',
            '&:hover': {
              backgroundColor: '#BBBBBB',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: '#00A950',
            border: '1px solid #00A950',
            height: '44px',
            fontSize: '14px',
          },
        },
        {
          props: { variant: 'outlined', color: 'error' },
          style: {
            background: '#FFFFFF',
            border: '1px solid #E53F3F',
            color: '#E53F3F',
            '&:hover': {
              backgroundColor: '#FFFFFF',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'secondary' },
          style: {
            background: '#FFFFFF',
            border: '1px solid #BBBBBB',
            color: '#BBBBBB',
            '&:hover': {
              backgroundColor: '#FFFFFF',
            },
          },
        },
        {
          props: { variant: 'text' },
          style: {
            color: 'white',
            fontWeight: 400,
            height: 'auto',
          },
        },
        {
          props: { size: 'small' },
          style: {
            fontSize: ' 12px',
            lineHeight: '18px',
            height: '26px',
            minWidth: '51px',
          },
        },
        {
          props: { size: 'medium' },
          style: {
            fontSize: ' 14px',
            lineHeight: '21px',
          },
        },
        {
          props: { size: 'large' },
          style: {
            fontSize: '20px',
            lineHeight: '30px',
            height: '80px',
          },
        },
      ],
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: 'white',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          fontWeight: '300',
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          fontWeight: '700',
          fontSize: '14px',
          lineHeight: '21px',
          color: '#012336',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .Mui-selected': {
            backgroundColor: 'transparent',
            color: '#0C5E96',
            textDecoration: 'underline #0C5E96 solid 2px',
            textUnderlinePosition: 'under',
          },
          '& .Mui-selected:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { disabled: true },
          style: {
            outline: 'none',
            border: 'none',
            '& .MuiInputBase-input': {
              backgroundColor: '#E8E8E8',
              overflow: 'hidden',
            },
            '& .MuiInputBase-root': {
              backgroundColor: '#E8E8E8',
              overflow: 'hidden',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            minHeight: '44px',
          },
        },
      ],
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          height: '27px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 16,
          fontWeight: 600,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': { backgroundColor: 'transparent' },
        },
      },
    },
  },
})

export default theme


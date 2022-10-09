import { createTheme } from '@mui/material'
import shadows, { Shadows } from '@mui/material/styles/shadows'

const theme = createTheme({
  shadows: shadows.map(() => 'none') as Shadows,
  palette: {
    primary: {
      main: '#00A950',
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
      variants: [
        {
          props: { variant: 'h1' },
          style: {
            fontWeight: 600,
            fontSize: '32px',
          },
        },
        {
          props: { variant: 'h2' },
          style: {
            fontWeight: 600,
            fontSize: '24px',
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
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
      variants: [
        {
          props: { variant: 'text', color: 'primary', size: 'large' },
          style: {
            fontWeight: 400,
            fontSize: 20,
            color: 'white',
          },
        },
        {
          props: { variant: 'contained', color: 'primary', size: 'large' },
          style: {
            fontWeight: 700,
            fontSize: 20,
            color: 'white',
          },
        },
        {
          props: { variant: 'contained', color: 'primary', size: 'medium' },
          style: {
            background: '#00A950',
            color: 'white',
            fontSize: 14,
            fontWeight: 900,
            height: 44,
            minWidth: 88,
            '&:hover': {
              backgroundColor: '#00A950',
            },
          },
        },
        {
          props: { variant: 'contained', color: 'warning', size: 'medium' },
          style: {
            background: '#E53F3F',
            color: 'white',
            fontSize: 14,
            fontWeight: 900,
            height: 44,
            minWidth: 88,
            '&:hover': {
              backgroundColor: '#E53F3F',
            },
          },
        },
        {
          props: { variant: 'contained', color: 'primary', size: 'small' },
          style: {
            background: '#00A950',
            color: 'white',
            fontSize: 12,
            fontWeight: 900,
            '&:hover': {
              backgroundColor: '#00A950',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            background: 'white',
            color: '#00A950',
            border: '1px solid #00A950',
            height: '44px',
            fontSize: '14px',
            fontWeight: 900,
          },
        },
        {
          props: { variant: 'outlined', color: 'primary', size: 'small' },
          style: {
            background: 'white',
            color: '#00A950',
            fontSize: 12,
            fontWeight: 900,
            height: '26px',
          },
        },
        {
          props: { variant: 'contained', color: 'secondary', size: 'medium' },
          style: {
            background: '#BBBBBB',
            color: 'white',
            fontSize: 14,
            fontWeight: 900,
            height: '44px',
            minWidth: 88,
            '&:hover': {
              backgroundColor: '#BBBBBB',
            },
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
      styleOverrides: {
        root: {},
      },
      variants: [
        {
          props: { disabled: true },
          style: {
            backgroundColor: '#E8E8E8',
            outline: 'none',
            border: 'none',
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            height: '44px',
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


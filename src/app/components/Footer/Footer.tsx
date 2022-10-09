import * as React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'

import { ColumnBox } from 'app/components'
import { IMenuItem } from 'app/components/Layout/interfaces'

import { PlainObject } from 'cores/utils/commonType'

import FooterMenu from './FooterMenu'

interface FooterState {
  menu: IMenuItem[]
}

const Copyright = () => {
  const { t } = useTranslation()

  return <Typography variant="h5">{t('COPYRIGHT')}</Typography>
}

class Footer extends React.Component<PlainObject, FooterState> {
  state = {
    menu: [
      { name: 'PRIVACY_POLICY_TITLE', link: '' },
      { name: 'TERM_CONDITION_TITLE', link: '' },
    ],
  }

  render() {
    return (
      <ColumnBox sx={{ position: 'fixed', bottom: '0px', width: '100%', zIndex: 2 }}>
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 2,
            px: '60px',
            height: '50px',
            mt: 'auto',
            backgroundColor: '#00A950',
            justifyContent: 'space-between',
            display: 'flex',
          }}
        >
          <Copyright />
          <FooterMenu value={this.state.menu} />
        </Box>
      </ColumnBox>
    )
  }
}

export default Footer


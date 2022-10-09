import React from 'react'
import { TFunction, withTranslation } from 'react-i18next'
import { AppBar, Toolbar } from '@mui/material'
import Typography from '@mui/material/Typography'
import { IMenuItem } from 'app/components/Layout/interfaces'
import pages from 'app/config/pages'
import { PlainObject } from 'cores/utils/commonType'

import HeaderToolBar from './HeaderToolBar'

interface HeaderState {
  menu: IMenuItem[]
}

class Header extends React.Component<PlainObject, HeaderState> {
  state = {
    menu: [
      { name: 'CAR_MANAGEMENT_TITLE', isActive: true, link: `${pages.carListPath}` },
      { name: 'COMPANY_MANAGEMENT_TITLE', link: `${pages.companyListPath}` },
      { name: 'USER_MANAGEMENT_TITLE', link: `${pages.userListPath}` },
    ],
  }

  render() {
    const t = this.props['t'] as TFunction

    return (
      <AppBar>
        <Toolbar disableGutters>
          <Typography variant="h2">{t('NAME')}</Typography>
          <HeaderToolBar value={this.state.menu} />
        </Toolbar>
      </AppBar>
    )
  }
}

export default withTranslation()(Header)


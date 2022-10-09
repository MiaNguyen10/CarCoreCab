
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonGroup, styled } from '@mui/material'
import { MenuDivider } from 'app/components'
import { IMenuProps } from 'app/components/Layout/interfaces'

const FooterButton = styled(Button)({
  color: 'white',
  fontSize: '14px',
  cursor: 'pointer',
})

const FooterMenu = (props: IMenuProps) => {
  const { t } = useTranslation()

  return (
    <ButtonGroup variant="text" aria-label="text button group">
      { props.value.map( ( menu, index ) => (
        <React.Fragment key={ `footer-fragment-${index}` }>
          <FooterButton key={ `footer-menu-btn-${index}` }>{ t(menu.name) }</FooterButton>
          { index < props.value.length - 1
              && <MenuDivider key={ `footer-divider-${index}` } height="auto"/>
          }
        </React.Fragment>

      )) }
    </ButtonGroup>
  )
}

export default FooterMenu

import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonGroup } from '@mui/material'
import { IMenuProps } from 'app/components/Layout/interfaces'
import { RestrictedPermission, ETier, TPermission } from 'app/middlewares/PermissionProvider'

const HeaderMenu = (props: IMenuProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const getPermissions = (menuName: string): TPermission[] | [] => {
    if(menuName.includes('CAR')) {
      return [
        ETier.KBANK_ADMIN,
        ETier.COMPANY_ADMIN,
        ETier.COMPANY_CHECKER,
        ETier.COMPANY_LABELER,
        ETier.COMPANY_VIEWER,
      ]
    } else if (menuName.includes('USER') || menuName.includes('COMPANY')) {
      return [
        ETier.KBANK_ADMIN,
        ETier.COMPANY_ADMIN,
      ]
    }

    return []
  }

  return (
    <ButtonGroup
      variant="text"
      aria-label="text button group"
      sx={{
        paddingRight: '60px',
      }}
    >
      {props.value.map((menu) => (
        <RestrictedPermission key={menu.name} permission={getPermissions(menu.name)}>
          <Button
            variant={menu.isActive ? 'contained' : 'contained'}
            color="primary"
            size="large"
            onClick={() => navigate(menu.link)}
          >
            {t(menu.name)}
          </Button>
        </RestrictedPermission>
      ))}
    </ButtonGroup>
  )
}

export default HeaderMenu


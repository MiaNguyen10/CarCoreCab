/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListItemIcon, MenuItem, MenuList, styled } from '@mui/material'
import { OnClickType } from 'app/config/Constant'
import * as React from 'react'

const MenuItemStyled = styled(MenuItem)({
  padding: 0,
  '&:hover': {
    backgroundColor: 'transparent',
  },
})
const MenuListStyled = styled(MenuList)({
  display: 'flex',
  flexDirection: 'row',
})
const MenuAction: React.FC<MenuActionProps> = ({ submenu }) => {
  return (
    <MenuListStyled>
      {submenu?.map((sub, index) => (
        <MenuItemStyled
          key={`table-item-${index}`}
          disableRipple
          onClick={sub?.link ? sub?.link : sub?.onClick || null}
        >
          <ListItemIcon>{sub.icon}</ListItemIcon>
        </MenuItemStyled>
      ))}
    </MenuListStyled>
  )
}

export default MenuAction

export interface SubmenuProps {
  link?: OnClickType
  onClick?: OnClickType
  icon?: any
}
export interface MenuActionProps {
  submenu?: Array<SubmenuProps>
}


import * as React from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks'
import { useNavigate } from 'react-router-dom'

import ProfileIcon from 'app/assets/icons/ProfileIcon'
import { logout } from 'cores/reducers/authentication'
import { useAppDispatch } from 'cores/store/hook'
import pages from 'app/config/pages'

const ProfileButton = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'profile-pop-menu',
  })

  const handleShowProfile = () => {
    popupState.close()

    navigate(pages.profilePath)
  }

  const handleLogout = () => {
    popupState.close()

    dispatch(logout())
    navigate(pages.loginPath)
  }

  return (
    <React.Fragment>
      <Button variant="contained" {...bindTrigger(popupState)}>
        <ProfileIcon />
      </Button>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={handleShowProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default ProfileButton


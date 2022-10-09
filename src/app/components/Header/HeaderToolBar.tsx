import * as React from 'react'
import { useSelector } from 'react-redux'
import { CenterBox } from 'app/components/Box'
import HeaderMenu from 'app/components/Header/HeaderMenu'
import ProfileButton from 'app/components/Header/ProfileButton'
import LangChanger from 'app/components/LangChanger'
import { IMenuProps } from 'app/components/Layout/interfaces'
import { selectSession } from 'cores/reducers/authentication'

const HeaderToolBar = (props: IMenuProps) => {
  const currentSession = useSelector(selectSession)

  return (
    <CenterBox>
      {currentSession && <HeaderMenu value={props.value} />}
      <LangChanger />
      {currentSession && <ProfileButton />}
    </CenterBox>
  )
}

export default HeaderToolBar


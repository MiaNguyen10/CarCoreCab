import * as React from 'react'
import { MenuDivider } from 'app/components'
import { CenterBox } from 'app/components/Box'
import { ConfigService } from 'app/config/ConfigService'
import Container from 'typedi'

import LangButton from './LangButton'

const LangChanger = () => {
  const configService = Container.get(ConfigService)
  const config = configService.language
  const languages = config.supported

  const buttonGroup = languages.map((language, index) => (
    <React.Fragment key={index}>
      <LangButton key={index} language={language} />
      {index < languages.length - 1 && (
        <CenterBox>
          <MenuDivider key={index} height="20px" />
        </CenterBox>
      )}
    </React.Fragment>
  ))

  return <CenterBox sx={{ paddingRight: '20px' }}>{buttonGroup}</CenterBox>
}

export default LangChanger


import * as React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { styled } from '@mui/system'
import { ConfigService } from 'app/config/ConfigService'
import Container from 'typedi'

interface IRecaptcha {
  onChange?: (token: string | null) => void
}

const RecaptchaWrapper = styled('div')({
  transform: 'scale(1.06)',
  transformOrigin: '0 0',
  marginTop: '47px',
})

const CustomRecaptcha = styled(ReCAPTCHA)({
  width: '100px',
})

const Rechaptcha = (props: IRecaptcha) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setRechaptcha = props.onChange ?? ((_token: string | null) => undefined)
  const configService = Container.get(ConfigService)
  const config = configService.recaptcha

  return (
    <RecaptchaWrapper className="captcha">
      <CustomRecaptcha
        style={{ display: 'inline-block' }}
        sitekey={ config.key }
        onChange={ setRechaptcha }
      />
    </RecaptchaWrapper>
  )
}

export default Rechaptcha

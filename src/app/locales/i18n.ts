import { initReactI18next } from 'react-i18next'
import { ConfigService } from 'app/config/ConfigService'
import i18n from 'i18next'
import Container from 'typedi'

import enDict from './en/translation.json'
import thDict from './th/translation.json'

const configService = Container.get(ConfigService)
const config = configService.language

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enDict,
    },
    th: {
      translation: thDict,
    },
  },
  lng: config.default,
  fallbackLng: config.default,

  interpolation: {
    escapeValue: false,
  },
})

export default i18n


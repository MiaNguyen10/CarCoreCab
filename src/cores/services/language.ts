import { ConfigService } from 'app/config/ConfigService'
import { atom, SetterOrUpdater, useRecoilState } from 'recoil'
import Container from 'typedi'

interface LanguageInterface {
  language: string
}
interface IUseLanguage {
  currentLanguage: string
  setLanguageState: SetterOrUpdater<LanguageInterface>
}

const configService = Container.get(ConfigService)
const config = configService.language

const languageState = atom<LanguageInterface>({
  key: 'languageState',
  default: {
    language: config.default,
  },
})

function useLanguage(): IUseLanguage {
  const [ getLanguage, setLanguageState ] = useRecoilState(languageState)
  const currentLanguage = getLanguage?.language || config.default

  return {
    currentLanguage,
    setLanguageState,
  }
}

export default useLanguage


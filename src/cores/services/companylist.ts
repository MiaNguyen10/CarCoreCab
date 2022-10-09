import { useAppSelector } from 'cores/store/hook'
import { useTranslation } from 'react-i18next'
import { selectAllCompanies } from 'cores/reducers/company/index'
interface IUseCompany {
  companyList: (string | undefined)[]
}

function useCompany(): IUseCompany {
  const allCompanies = useAppSelector(selectAllCompanies)
  const { t } = useTranslation()
  const companyList = []
  if (allCompanies) {
    companyList.push(`${t('USER_ALL_COMPANY')}`)
    for (let i = 0; i < allCompanies.length; i++) {
      companyList.push(allCompanies[i]?.name)
    }
  }

  return {
    companyList,
  }
}

export default useCompany


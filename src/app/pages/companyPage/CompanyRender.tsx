import checkPath, { ACTION_DEFAULT } from 'cores/utils/checkPath'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { CompanyDetail, CompanyList } from './components'

const CompanyRender = () => {
  const location = useLocation()
  const pathnames = checkPath(location?.pathname)
  if (pathnames.action !== ACTION_DEFAULT) {
    return <CompanyDetail isAdd={pathnames?.isAdd} isEdit={pathnames?.isEdit} isView={pathnames?.isView} />
  }

  return <CompanyList />
}

export default CompanyRender


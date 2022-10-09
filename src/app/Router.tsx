import React from 'react'
import { Route, Routes } from 'react-router'

import { Layout } from 'app/components'
import pages from 'app/config/pages'
import ProtectedRoutes from 'app/middlewares/ProtectedRoutes'
import { RestrictedPermission, ETier } from 'app/middlewares/PermissionProvider'
import {
  AddUser,
  CreateCar,
  EditCar,
  CarListChecker,
  CarRender,
  CompanyRender,
  EditUser,
  ExpiredLink,
  ForgotPassword,
  Login,
  PageNotFound,
  Profile,
  ResetPassword,
  UserList,
} from './pages'

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={`/${pages.loginPath}`} element={<Login />} />
        <Route path={`/${pages.forgotPassword}`} element={<ForgotPassword />} />
        <Route path={`/${pages.resetPassword}`} element={<ResetPassword />} />
        <Route path={`/${pages.expiredLink}`} element={<ExpiredLink />} />
        <Route element={<ProtectedRoutes />}>
          <Route
            element={
              <RestrictedPermission
                permission={[
                  ETier.KBANK_ADMIN,
                  ETier.COMPANY_SUPERUSER,
                  ETier.COMPANY_CHECKER,
                  ETier.COMPANY_LABELER,
                  ETier.COMPANY_VIEWER,
                ]}
              />
            }
          >
            <Route element={<RestrictedPermission permission={[ETier.KBANK_ADMIN, ETier.COMPANY_SUPERUSER]} />}>
              <Route path={`${pages.companyListPath}`} element={<CompanyRender />} />
              <Route element={<RestrictedPermission permission={[ETier.KBANK_ADMIN]} />}>
                <Route path={`${pages.companyEditPath}`} element={<CompanyRender />} />
                <Route path={`${pages.companyAddPath}`} element={<CompanyRender />} />
              </Route>
              <Route path={`${pages.companyDetailPath}`} element={<CompanyRender />} />
              <Route path={`${pages.userListPath}`} element={<UserList />} />
              <Route path={`${pages.userAddPath}`} element={<AddUser />} />
              <Route path={`${pages.userEditPath}`} element={<EditUser />} />
            </Route>
            <Route path={`${pages.carListPath}`} element={<CarRender />} />
            <Route path={`${pages.carListPathChecker}`} element={<CarListChecker />} />
          </Route>
          <Route path={`/${pages.profilePath}`} element={<Profile />} />
          <Route
            element={
              <RestrictedPermission
                permission={[ETier.COMPANY_SUPERUSER, ETier.COMPANY_CHECKER, ETier.COMPANY_LABELER]}
              />
            }
          >
            <Route path={`/${pages.carAddPath}`} element={<CreateCar />} />
          </Route>
          <Route path={`/${pages.carrEditPath}`} element={<EditCar />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}

export default Router


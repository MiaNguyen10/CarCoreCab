import {
  IAuthentication,
  IBackend,
  IGoogle,
  ILanguage,
  IRecaptcha,
  IUser,
  ICompanyPath,
  ICar,
  ISession,
  IConstantPath,
} from 'app/config/interfaces'
import { Service } from 'typedi'

@Service()
export class ConfigService {
  public readonly language: Readonly<ILanguage>

  public readonly session: Readonly<ISession>

  public readonly google: Readonly<IGoogle>

  public readonly recaptcha: Readonly<IRecaptcha>

  public readonly authentication: Readonly<IAuthentication>

  public readonly user: Readonly<IUser>

  public readonly company: Readonly<ICompanyPath>

  public readonly car: Readonly<ICar>

  public readonly constant: Readonly<IConstantPath>

  public readonly backend: Readonly<IBackend>

  constructor() {
    this.language = {
      default: 'en',
      supported: ['en', 'th'],
    }

    this.session = {
      idleTime: 1000,
      expiredTime: 1000 * 60 * 30,
    }

    this.google = {
      host: 'https://www.google.com/',
    }

    this.recaptcha = {
      path: 'recaptcha/api/siteverify',
      key: process.env['REACT_APP_GOOGLE_RECAPTCHA_KEY'] ?? '',
      secret: process.env['REACT_APP_GOOGLE_RECAPTCHA_SECRET'] ?? '',
    }

    this.authentication = {
      path: {
        login: 'v1/session/login',
        extend: 'v1/session/extend',
      },
      stateName: 'authentication',
    }

    this.user = {
      path: {
        forgotPassword: '/v1/user/forget-password',
        resetPassword: '/v1/user/reset-password',
        changePassword: '/v1/user/change-password',
        listUser: '/v1/user/list',
        singleUser: '/v1/user/profile/inquire',
        addUser: '/v1/user/profile',
        editUser: '/v1/user/profile',
        deleteUser: '/v1/user/profile',
      },
      stateName: 'user',
    }

    this.company = {
      path: {
        listCompany: '/v1/company/list',
        singleCompany: '/v1/company/inquire',
        addCompany: '/v1/company',
        editCompany: '/v1/company',
      },
      stateName: 'company',
    }

    this.car = {
      path: {
        listCar: '/v1/car/list',
        singleCar: '/v1/car/inquire',
        addCar: '/v1/car',
        editCar: '/v1/car',
        countCar: '/v1/car/count',
        approveCar: 'v1/car/approve',
        disapproveCar: 'v1/car/disapprove',
        revokeCar: 'v1/car/revoke',
      },
      stateName: 'company',
    }

    this.constant = {
      path: {
        listProvince: '/v1/province/list',
      },
      stateName: 'constant',
    }

    this.backend = {
      host: process.env['REACT_APP_BACKEND_HOST'] ?? '',
      port: process.env['REACT_APP_BACKEND_PORT'] ? parseInt(process.env['REACT_APP_BACKEND_PORT'], 10) : 8080,
      headers: {
        partnerId: 'labelling-web',
        partnerSecret: 'labelling',
        requestId: '6d782488-62ef-11ec-90d6-0242ac120003',
        requestDt: '2021-12-22T13:15:47.999+07:00',
      },
    }
  }
}


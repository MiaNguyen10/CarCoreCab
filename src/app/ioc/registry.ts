import Container from 'typedi'
import { ConfigService } from 'app/config/ConfigService'
import { IBackend, IGoogle } from 'app/config/interfaces'
import { BackendApiClient, GoogleToken } from 'app/ioc/token'
import { AxiosAdapter } from 'cores/adapters/AxiosAdapter'
import { LocalStorageAdapter } from 'cores/adapters/LocalStorageAdapter'
// import { ObsAdapter } from 'cores/adapters/huawei/ObsAdapter'
;(function register() {
  const configService = Container.get(ConfigService)

  registerBackendClient(configService.backend)
  registerGoogleClient(configService.google)
  registerLocalStorage()
  // registerConfig(getConfigFromHuaweiObs())
})()

function registerBackendClient(config: IBackend) {
  const headers = {
    'Content-Type': 'application/json',
  }

  Container.set(BackendApiClient, new AxiosAdapter(config.host, 10000, headers))
}

function registerGoogleClient(config: IGoogle) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  }

  Container.set(GoogleToken, new AxiosAdapter(config.host, 10000, headers))
}

function registerLocalStorage() {
  Container.set(LocalStorageAdapter, new LocalStorageAdapter(localStorage))
}

// async function getConfigFromHuaweiObs() {
//   Container.set(ObsAdapter, new ObsAdapter({
//     access_key_id: 'xxx',
//     secret_access_key: 'xxx',
//     server: 'xxx',
//     bucketName: 'xxx',
// }))
// await Container.get(ObsAdapter).initBucket()
// const configContent = await Container.get(ObsAdapter).getConfigContent('xxx')

// return configContent
// }


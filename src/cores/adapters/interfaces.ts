import { PlainObject } from 'cores/utils/commonType'

export type ResponseHttp = {
  data: unknown
  headers: PlainObject
  status: number
}

export interface HttpClient {
  setHeaders(headers: PlainObject): this
  get(url: string, query?: PlainObject): Promise<ResponseHttp>
  post(url: string, data: PlainObject): Promise<ResponseHttp>
  put(url: string, data: PlainObject): Promise<ResponseHttp>
  delete(url: string, data: PlainObject): Promise<ResponseHttp>
  patch(url: string, data: PlainObject): Promise<ResponseHttp>
}

export type TObsClientInput = {
  access_key_id: string
  secret_access_key: string
  server: string
  bucketName: string
}

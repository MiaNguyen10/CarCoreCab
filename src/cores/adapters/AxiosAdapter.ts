import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios'
import { HttpClient, ResponseHttp } from 'cores/adapters/interfaces'
import { PlainObject } from 'cores/utils/commonType'

export class AxiosAdapter implements HttpClient {
  private readonly client: Readonly<AxiosInstance>

  private headers: AxiosRequestHeaders

  constructor(baseURL: string, timeout: number, headers: AxiosRequestHeaders) {
    this.headers = headers
    this.client = axios.create({
      baseURL,
      timeout,
      headers,
    })
  }

  setHeaders(headers: AxiosRequestHeaders): this {
    this.headers = { ...this.headers, ...headers }

    return this
  }

  private getConfig(params?: PlainObject) {
    return {
      headers: this.headers,
      params,
    }
  }

  async get(url: string, query?: PlainObject): Promise<ResponseHttp> {
    const params = query || {}
    const { data, headers, status } = await this.client.get(url, this.getConfig(params))

    return { data, headers, status }
  }

  async post(url: string, data: PlainObject): Promise<ResponseHttp> {
    const { data: dataResponse, headers, status } = await this.client.post(url, data, this.getConfig())

    return { data: dataResponse, headers, status }
  }

  async put(url: string, data: PlainObject): Promise<ResponseHttp> {
    const { data: dataResponse, headers, status } = await this.client.put(url, data, this.getConfig())

    return { data: dataResponse, headers, status }
  }

  async delete(url: string): Promise<ResponseHttp> {
    const { data, headers, status } = await this.client.delete(url, this.getConfig())

    return { data, headers, status }
  }

  async patch(url: string, data: PlainObject): Promise<ResponseHttp> {
    const { data: dataResponse, headers, status } = await this.client.patch(url, data, this.getConfig())

    return { data: dataResponse, headers, status }
  }
}


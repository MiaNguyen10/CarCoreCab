import { HttpClient } from 'cores/adapters/interfaces'
import { Token } from 'typedi'

export const BackendApiClient = new Token<HttpClient>('api.backend')
export const GoogleToken = new Token<HttpClient>('google')

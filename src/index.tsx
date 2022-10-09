// eslint-disable-next-line simple-import-sort/imports
import 'reflect-metadata'
import 'app/ioc/registry'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from 'cores/store'

import './app/locales/i18n'

import App from './app/App'

/* eslint-disable  @typescript-eslint/no-non-null-assertion */
const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)


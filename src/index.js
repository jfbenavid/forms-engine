import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/app'
import { store } from './state/store/createStore'
import 'bootstrap/dist/css/bootstrap.min.css'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'))

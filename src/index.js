import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './app'
import { reducer } from './reducers'
import 'bootstrap/dist/css/bootstrap.min.css'

const initialState = {}

const store = createStore(reducer, initialState)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'))

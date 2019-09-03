import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './app'
import { reducer } from './reducers'
import { Map } from 'immutable'
import 'bootstrap/dist/css/bootstrap.min.css'

const store = createStore(
  reducer,
  Map({ forms: Map({}) }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'))

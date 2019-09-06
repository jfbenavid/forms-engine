import { createStore, compose } from 'redux'

import rootReducer from '../reducers'

const makeStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    rootReducer,
    composeEnhancers()
  )

  return store
}

export const store = makeStore()

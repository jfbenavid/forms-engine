import { GET_INITIAL_DATA } from '../actions/types'

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_INITIAL_DATA:
      return state
    default:
      return state
  }
}

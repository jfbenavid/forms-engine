import { fromJS } from 'immutable'
import * as actions from '../actions/types'

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case actions.INSERT_OPTIONS_IN_DROPDOWN: {
      return state// .setIn(['forms', [payload.name]], )
    }
    case actions.ADD_FORM:
      return state.setIn(['forms', [payload.name]], fromJS(payload.data))
    default:
      return state
  }
}

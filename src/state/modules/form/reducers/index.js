import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

import formActionTypes from '../actionTypes'
import initialState from 'initialState'

const models = handleActions(
  {
    [formActionTypes.ADD_FORM]: (_, { payload }) => ({ [payload.name]: payload.data }),
    [formActionTypes.INSERT_OPTIONS_IN_DROPDOWN]: (state, { payload }) => {
      return { [payload.name]: [...state.model.map(x => x.id === payload.data.id ? payload.data : x)] }
    }
  },
  initialState.getIn(['forms', 'models'])
)

export default combineReducers({ models })

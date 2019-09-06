import { createAction } from 'redux-actions'
import formActionTypes from '../actionTypes'

export const addForm = createAction(
  formActionTypes.ADD_FORM
)

export const insertOptionsInDropdown = createAction(
  formActionTypes.INSERT_OPTIONS_IN_DROPDOWN
)

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DynamicForm from './dynamic-form'
import { model } from '../utils/mocks/form'
import * as appActs from '../state/modules/form/actions'

const handleSubmit = model => {
  console.log(JSON.stringify(model))
}

const App = props => {
  useEffect(() => {
    const { appActions } = props
    appActions && appActions.addForm({ name: 'model', data: model })
  }, [])

  const { models } = props
  if (!models || !models.model) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <DynamicForm
      title='testing'
      model={models.model}
      modelName='model'
      handleSubmit={model => handleSubmit(model)}
    />
  )
}

const mapStateToProps = reducers => reducers.forms

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActs, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

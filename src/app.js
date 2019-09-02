import React from 'react'
import { connect } from 'react-redux'
import DynamicForm from './forms'
import { model } from './mocks/form'

const handleSubmit = model => {
  console.log(JSON.stringify(model))
}

const App = () => {
  return (
    <DynamicForm title='testing' model={model} handleSubmit={model => handleSubmit(model)} />
  )
}

const mapStateToProps = state => ({ formModel: model })

export default connect(mapStateToProps, null)(App)

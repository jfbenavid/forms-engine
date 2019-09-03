import React, { Component } from 'react'
import { connect } from 'react-redux'
import DynamicForm from './dynamic-form'
import { ADD_FORM } from './actions/types'
import { model } from './mocks/form'

class App extends Component {
  constructor (props) {
    super(props)
    props.dispatch({
      type: ADD_FORM,
      payload: { name: 'model', data: model }
    })
  }

  handleSubmit = model => {
    console.log(JSON.stringify(model))
  }

  render = () => {
    return (
      <DynamicForm
        title='testing'
        model={this.props.forms.model}
        modelName='model'
        handleSubmit={model => this.handleSubmit(model)}
      />
    )
  }
}

const mapStateToProps = state => {
  console.log(state.get('forms').has('model'))
  return ({ forms: { model } })
}

export default connect(mapStateToProps)(App)

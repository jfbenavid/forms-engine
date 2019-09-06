import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DynamicForm from './dynamic-form'
import { model } from '../utils/mocks/form'
import * as appActs from '../state/modules/form/actions'

class App extends Component {
  componentDidMount = () => {
    const { appActions } = this.props
    appActions && appActions.addForm({ name: 'model', data: model })
  }

  handleSubmit = model => {
    console.log(JSON.stringify(model))
  }

  render = () => {
    const { models } = this.props
    if (models && models.model) {
      return (
        <DynamicForm
          title='testing'
          model={models.model}
          modelName='model'
          handleSubmit={model => this.handleSubmit(model)}
        />
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

const mapStateToProps = reducers => reducers.forms

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActs, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

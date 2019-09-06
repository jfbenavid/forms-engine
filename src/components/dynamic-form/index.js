import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, Row } from 'reactstrap'
import { InputForm, Select, Check } from './input'
import { config } from 'config'
import * as appActs from '../../state/modules/form/actions'

class DynamicForm extends Component {
  state = {}

  setDefaultValues = model => {
    const defaults = model && [...model.filter(x => x.value)]
    defaults && defaults.forEach(x => { this.state[x.id] = x.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleSubmit && this.props.handleSubmit(this.state)
  }

  componentDidMount = () => {
    const { model, appActions } = this.props
    this.setDefaultValues(model)

    const obj = model && model.filter(x => x.fillOptions)
    if (obj && obj.length > 0) {
      obj.forEach(async (x, i) => {
        const newOptions = []
        await window.fetch(`${config.apiUrl}/${x.fillOptions.uri}`)
          .then(y => y.json())
          .then(y => {
            newOptions.push(
              ...(y[x.fillOptions.uriResponsePropertyName] || (Array.isArray(y) ? y : []))
                .map(r => ({
                  key: r[x.fillOptions.valueKeyName],
                  value: r[x.fillOptions.displayKeyName]
                })))

            obj[i].options = newOptions
            appActions && appActions.insertOptionsInDropdown({ name: 'model', data: obj[i] })
          })
          .catch(y => console.log(`Error: ${y.message}`))
      })
    }
  }

  onChange = (e, key, type = '') => {
    const { model } = this.props
    if (type === 'checkbox') {
      const found = this.state[key] && this.state[key].find(d => d === e.target.value)

      if (found) {
        const data = this.state[key].filter(x => x !== found)
        this.setState({ [key]: data })
      } else {
        const other = this.state[key] ? [...this.state[key]] : []
        this.setState({
          [key]: [e.target.value, ...other]
        })
      }
    } else {
      this.setState({ [key]: e.target.value })
      const obj = model && model.find(x => x.depends && x.depends.from === key)
      obj && this.dropDependency(e, obj)
    }
  }

  dropDependency = (e, obj) => {
    window.fetch(`${config.apiUrl}/${obj.depends.uri}/${e.target.value}/`)
      .then(x => x.json())
      .then(x => {
        obj.options = x.characters.map((y, i) => ({ key: i + 1, value: y }))
        console.log(x)
        this.props.appActions && this.props.appActions.insertOptionsInDropdown({ name: 'model', data: obj })
      })
      .catch(x => console.log(`error: ${x.message}`))
  }

  renderForm = () => this.props.model && this.props.model.map(x => {
    switch (x.type) {
      default:
        return (
          <InputForm
            key={x.id}
            {...x}
            innerRef={key => { this[x.id] = key }}
            onChange={e => this.onChange(e, x.id)}
            current={this.state[x.id]}
          />
        )
      case 'select':
        return (
          <Select
            key={x.id}
            {...x}
            innerRef={key => { this[x.id] = key }}
            onChange={e => this.onChange(e, x.id)}
          />
        )
      case 'radio':
      case 'checkbox':
        return (
          <Check
            key={x.id}
            {...x}
            innerRef={key => { this[x.id] = key }}
            onChange={e => this.onChange(e, x.id, x.type)}
            current={this.state[x.id]}
          />
        )
    }
  })

  render () {
    const { title, buttonText } = this.props
    return (
      <Form onSubmit={e => { this.handleSubmit(e) }} className='mx-5'>
        {title && <h3>{title}</h3>}
        <Row>
          {this.renderForm()}
        </Row>
        <Button type='submit'>{buttonText || 'Submit'}</Button>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActs, dispatch)
})

export default connect(null, mapDispatchToProps)(DynamicForm)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Row } from 'reactstrap'
import { InputForm, Select, Check } from './input'
import { config } from '../../config/client'

class DynamicForm extends Component {
  state = {}
  defaultValues = {
    buttonText: 'Accept'
  }

  constructor (props) {
    super(props)
    const defaults = props.model.filter(x => x.value)
    defaults.forEach(x => { this.state[x.keys] = x.value })
  }

  componentDidMount () {
    const obj = this.props.model.filter(x => x.options && x.options.constructor === Object)
    if (obj.length > 0) {
      obj.forEach(async (x, i) => {
        const newOptions = []
        await window.fetch(`${config.apiUrl}/${x.options.uri}`)
          .then(y => y.json())
          .then(y => {
            newOptions.push(...(y[x.options.uriResponsePropertyName] || (Array.isArray(y) ? y : [])).map(r => ({
              key: r[x.options.keyName],
              value: r[x.options.valueName]
            })))

            obj[i].options = newOptions
          })
          .catch(y => console.log(`Error: ${y.message}`))
      })

      // this.props.model = this.props.model.map(o => obj.find(n => o.keys === n.keys) || o)
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleSubmit && this.props.handleSubmit(this.state)
  }

  onChange = (e, key, type = '') => {
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
      const obj = this.props.model.find(x => x.depends === key)
      obj && this.dropDependency(e, obj)
    }
  }

  dropDependency = (e, obj) => {
    window.fetch(`${config.apiUrl}/${obj.dependentUrl}/${e.target.value}`)
      .then(x => x.json())
      .then(x => {
        obj.options = x
        // this.model = this.model.map(y => y.)
      })
      .catch(x => console.log(`error: ${x.message}`))
  }

  renderForm = () => this.props.model.map((x, i) => {
    switch (x.type) {
      default:
        return <InputForm key={x.keys} {...x} innerRef={key => { this[x.keys] = key }} onChange={e => this.onChange(e, x.keys)} current={this.state[x.keys]} />
      case 'select':
        return <Select key={x.keys} {...x} innerRef={key => { this[x.keys] = key }} onChange={e => this.onChange(e, x.keys)} />
      case 'radio':
      case 'checkbox':
        return <Check key={x.keys} {...x} innerRef={key => { this[x.keys] = key }} onChange={e => this.onChange(e, x.keys, x.type)} current={this.state[x.keys]} />
    }
  })

  render () {
    return (
      <Form onSubmit={e => { this.handleSubmit(e) }} className='mx-5'>
        {this.props.title && <h3>{this.props.title}</h3>}
        <Row>
          {this.renderForm()}
        </Row>
        <Button type='submit'>{this.props.buttonText || this.defaultValues.buttonText}</Button>
      </Form>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps)(DynamicForm)

import React, { Component } from 'react'
import { Button, Form, Row } from 'reactstrap'
import { InputForm, Select, Check } from './input'

export default class DynamicForm extends Component {
  state = {}
  defaultValues = {
    title: 'This is a Title',
    buttonText: 'Accept'
  }

  constructor (props) {
    super(props)
    const defaults = props.model.filter(x => x.defaultValue)
    defaults.forEach(x => { this.state[x.keys] = x.defaultValue })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleSubmit && this.props.handleSubmit(this.state)
  }

  onChange = (e, key) => this.setState({
    [key]: e.target.value
  })

  renderForm = () => this.props.model.map((x, i) => {
    switch (x.type) {
      case 'input':
      case 'number':
      default:
        return <InputForm key={x.keys} {...x} innerRef={key => { this[x.keys] = key }} onChange={e => this.onChange(e, x.keys)} />
      case 'select':
        return <Select key={x.keys} {...x} innerRef={key => { this[x.keys] = key }} onChange={e => this.onChange(e, x.keys)} />
      case 'radio':
      case 'checkbox':
        return <Check key={x.keys} {...x} innerRef={key => { this[x.keys] = key }} onChange={e => this.onChange(e, x.keys)} current={this.state[x.keys]} />
    }
  })

  render () {
    return (
      <Form onSubmit={e => { this.handleSubmit(e) }} className='mx-5'>
        <h3>{this.props.title || this.defaultValues.title}</h3>
        <Row>
          {this.renderForm()}
        </Row>
        <Button type='submit'>{this.props.buttonText || this.defaultValues.buttonText}</Button>
      </Form>
    )
  }
}

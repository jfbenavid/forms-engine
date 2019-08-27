import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap'

export default class DynamicForm extends Component {
  state = {}
  defaultValues = {
    title: 'This is a Title',
    buttonText: 'Accept',
    col: 12,
    inputType: 'text'
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.props.handleSubmit) this.props.handleSubmit(this.state)
  }

  onChange = (e, key) => this.setState({
    [key]: this[key].value
  })

  renderField = x => {
    switch (x.type) {
      case 'input':
      case 'number':
      default:
        return (
          <FormGroup>
            <Label htmlFor={x.key} key={`l${x.key}`}>
              {x.label}
            </Label>
            <Input
              {...x.props}
              key={`i${x.key}`}
              innerRef={key => { this[x.key] = key }}
              type={x.type}
              onChange={e => this.onChange(e, x.key)}
            />
          </FormGroup>
        )
      case 'select':
        return (
          <FormGroup>
            <Label htmlFor={x.key} key={`l${x.key}`}>
              {x.label}
            </Label>
            <Input
              {...x.props}
              key={`i${x.key}`}
              innerRef={key => { this[x.key] = key }}
              type={x.type}
              onChange={e => this.onChange(e, x.key)}
            >
              <option defaultValue>Select</option>
              {
                x.options && x.options.map(o => (
                  <option key={o.key} value={o.key}>{o.value}</option>
                ))
              }
            </Input>
          </FormGroup>
        )
      case 'radio':
        return (
          <FormGroup>
            <legend className='col-form-label'>{x.label}</legend>
            <FormGroup check inline>
              <Label check>
                <Input
                  {...x.props}
                  key={`i${x.key}`}
                  innerRef={key => { this[x.key] = key }}
                  type={x.type}
                  onChange={e => this.onChange(e, x.key)}
                  value={x.value}
                />
                {x.label}
              </Label>
            </FormGroup>
          </FormGroup>
        )
    }
  }

  renderCols = o => o.map(x => {
    const col = x.cols || {}
    return (
      <Col sm={col.sm || this.defaultValues.col} md={col.md || this.defaultValues.col} key={x.key}>
        {this.renderField(x)}
      </Col>
    )
  })

  renderForm = () => this.props.model.map((x, i) => (
    <Row key={i}>
      {this.renderCols(x)}
    </Row>
  ))

  render () {
    return (
      <Form onSubmit={e => { this.handleSubmit(e) }} className='mx-5'>
        <h3>{this.props.title || this.defaultValues.title}</h3>
        {this.renderForm()}
        <Button type='submit'>{this.props.buttonText || this.defaultValues.buttonText}</Button>
      </Form>
    )
  }
}

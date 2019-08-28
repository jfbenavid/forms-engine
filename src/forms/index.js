import React, { useState, useEffect } from 'react'
import { Button, Form, Row } from 'reactstrap'
import { InputForm, Select, Check } from './input'

export const DynamicForm = (props) => {
  const initialState = {}

  useEffect(() => {
    props.model.filter(x => x.value).forEach(x => {
      initialState[x.keys] = x.value
    })
  }, [])

  const [state, setState] = useState(initialState)

  const renderForm = () => props.model.map(x => {
    switch (x.type) {
      default:
        return <InputForm key={x.keys} {...x} innerRef={key => { window[x.keys] = key }} handleChange={e => handleChange(e, x.keys)} current={state[x.keys]} />
      case 'select':
        return <Select key={x.keys} {...x} innerRef={key => { window[x.keys] = key }} handleChange={e => handleChange(e, x.keys)} />
      case 'radio':
      case 'checkbox':
        return <Check key={x.keys} {...x} innerRef={key => { window[x.keys] = key }} handleChange={e => handleChange(e, x.keys, x.type)} current={state[x.keys]} />
    }
  })

  const handleChange = (e, key, type = '') => {
    if (type === 'checkbox') {
      const found = state[key] && state[key].find(d => d === e.target.value)

      if (found) {
        const data = state[key].filter(x => x !== found)
        setState({ ...state, [key]: data })
      } else {
        const other = state[key] ? [...state[key]] : []
        setState({
          [key]: [e.target.value, ...other]
        })
      }
    } else {
      setState({ ...state, [key]: e.target.value })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.handleSubmit && props.handleSubmit()
  }

  return (
    <Form onSubmit={e => { handleSubmit(e) }} className='mx-5'>
      {props.title && <h3>{props.title}</h3>}
      <Row>
        {renderForm()}
      </Row>
      <Button type='submit'>{props.buttonText || 'Submit'}</Button>
    </Form>
  )
}

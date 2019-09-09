import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, Row } from 'reactstrap'
import { InputForm, Select, Check } from './input'
import { config } from 'config'
import * as appActs from '../../state/modules/form/actions'

const DynamicForm = (props) => {
  const { title, buttonText, model, appActions } = props
  const defaultState = {}
  const defaults = model && [...model.filter(x => x.value)]
  defaults && defaults.forEach(x => {
    defaultState[x.id] = x.value
  })
  const [formState, setFormState] = useState(defaultState)
  const inputRef = useRef({})

  useEffect(() => {
    componentDidMount()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleSubmit && props.handleSubmit(formState)
  }

  const componentDidMount = () => {
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
            if (obj[i].value) {
              const e = document.getElementById(obj[i].id)
              e.value = obj[i].value
              e.onChange()
            }
          })
          .catch(y => console.log(`Error: ${y.message}`))
      })
    }
  }

  const dropDependency = (e, obj) => {
    window.fetch(`${config.apiUrl}/${obj.depends.uri}/${e.target.value}/`)
      .then(x => x.json())
      .then(x => {
        obj.options = x.characters.map((y, i) => ({ key: i + 1, value: y }))
        props.appActions && props.appActions.insertOptionsInDropdown({ name: 'model', data: obj })
      })
      .catch(x => console.log(`error: ${x.message}`))
  }

  const onChange = (e, key, type = '') => {
    if (type === 'checkbox') {
      const found = formState[key] && formState[key].find(d => d === e.target.value)

      if (found) {
        const data = formState[key].filter(x => x !== found)
        setFormState({ ...formState, [key]: data })
      } else {
        const other = formState[key] ? [...formState[key]] : []
        setFormState({ ...formState, [key]: [e.target.value, ...other] })
      }
    } else {
      setFormState({ ...formState, [key]: e.target.value })
      const obj = model && model.find(x => x.depends && x.depends.from === key)
      obj && dropDependency(e, obj)
    }
  }

  const renderForm = () => {
    return props.model && props.model.map(x => {
      switch (x.type) {
        default:
          return (
            <InputForm
              key={x.id}
              {...x}
              innerRef={key => { inputRef.current[x.id] = key }}
              onChange={e => onChange(e, x.id)}
              current={formState[x.id]}
            />
          )
        case 'select':
          return (
            <Select
              key={x.id}
              {...x}
              innerRef={key => { inputRef.current[x.id] = key }}
              onChange={e => onChange(e, x.id)}
            />
          )
        case 'radio':
        case 'checkbox':
          return (
            <Check
              key={x.id}
              {...x}
              innerRef={key => { inputRef.current[x.id] = key }}
              onChange={e => onChange(e, x.id, x.type)}
              current={formState[x.id]}
            />
          )
      }
    })
  }

  return (
    <Form onSubmit={e => { handleSubmit(e) }} className='mx-5'>
      {title && <h3>{title}</h3>}
      <Row>
        {renderForm()}
      </Row>
      <Button type='submit'>{buttonText || 'Submit'}</Button>
    </Form>
  )
}

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActs, dispatch)
})

export default connect(null, mapDispatchToProps)(DynamicForm)

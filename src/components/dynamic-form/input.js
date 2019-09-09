import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

const renderSelectOptions = (options = []) => {
  return options.map(o => (
    <option key={o.key} value={o.key}>{o.value}</option>
  ))
}

export const InputForm = (p) => {
  const {
    id,
    className = [],
    label = '',
    props = {},
    type,
    onChange,
    innerRef,
    value = '',
    current = value
  } = p

  return (
    <FormGroup key={id} className={className.join(' ')}>
      <Label htmlFor={id} key={`l${id}`}>
        {label}
      </Label>
      <Input
        {...props}
        key={`i${id}`}
        id={id}
        innerRef={innerRef}
        type={type}
        onChange={onChange}
        value={current}
      />
    </FormGroup>
  )
}

export const Select = (p) => {
  const {
    id,
    className = [],
    label = '',
    props = {},
    type,
    options = [],
    onChange,
    innerRef,
    value = 'default',
    unselectedText = '',
    hiddenUnselected = false,
    disabledUnselected = false
  } = p

  return (
    <FormGroup key={id} className={className.join(' ')}>
      <Label htmlFor={id} key={`l${id}`}>
        {label}
      </Label>
      <Input
        {...props}
        key={`i${id}`}
        id={id}
        innerRef={innerRef}
        type={type}
        onChange={onChange}
        defaultValue={value}
      >
        <option
          value='default'
          hidden={hiddenUnselected}
          disabled={disabledUnselected}
        >
          {unselectedText || 'Select'}
        </option>
        {renderSelectOptions(options)}
      </Input>
    </FormGroup>
  )
}

export const Check = (p) => {
  const {
    id,
    className = [],
    label = '',
    props = {},
    type,
    options = [],
    onChange,
    innerRef,
    inline = true,
    value = '',
    current = value
  } = p

  return (
    <FormGroup key={id} className={className.join(' ')}>
      <legend className='col-form-label'>{label}</legend>
      {
        options.map((x, i) => {
          let checked = false
          if (type === 'checkbox') {
            checked = (current && current.length > 0) && current.indexOf(x.value) > -1
          } else {
            checked = current && x.value === current
          }
          return (
            <FormGroup key={`${id}${i}`} check inline={inline}>
              <Label key={`l${id}${i}`} check>
                <Input
                  {...props}
                  innerRef={innerRef}
                  type={type}
                  onChange={onChange}
                  id={id}
                  name={id}
                  key={`i${id}${i}`}
                  value={x.key}
                  checked={checked}
                />
                {x.value}
              </Label>
            </FormGroup>
          )
        })
      }
    </FormGroup>
  )
}

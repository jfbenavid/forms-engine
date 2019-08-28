import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

export const InputForm = ({ keys, className = [], label = '', props = {}, type, handleChange, innerRef, value = '', current = value }) => (
  <FormGroup key={keys} className={className.join(' ')}>
    <Label htmlFor={keys} key={`l${keys}`}>
      {label}
    </Label>
    <Input
      {...props}
      key={`i${keys}`}
      innerRef={innerRef}
      type={type}
      onChange={handleChange}
      value={current}
    />
  </FormGroup>
)

export const Select = ({ keys, className = [], label = '', props = {}, type, options = [], handleChange, innerRef, value = '', unselectedText = '', hiddenUnselected = false, disabledUnselected = false }) => (
  <FormGroup key={keys} className={className.join(' ')}>
    <Label htmlFor={keys} key={`l${keys}`}>
      {label}
    </Label>
    <Input
      {...props}
      key={`i${keys}`}
      innerRef={innerRef}
      type={type}
      onChange={handleChange}
      defaultValue={value}
    >
      <option value='default' hidden={hiddenUnselected} disabled={disabledUnselected}>{unselectedText || 'Select'}</option>
      {
        options.map(o => (
          <option key={o.key} value={o.key}>{o.value}</option>
        ))
      }
    </Input>
  </FormGroup>
)

export const Check = ({ keys, className = [], label = '', props = {}, type, options = [], handleChange, innerRef, inline = true, value = '', current = value }) => (
  <FormGroup key={keys} className={className.join(' ')}>
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
          <FormGroup key={`${keys}${i}`} check inline={inline}>
            <Label key={`l${keys}${i}`} check>
              <Input
                {...props}
                innerRef={innerRef}
                type={type}
                onChange={handleChange}
                name={keys}
                key={`i${keys}${i}`}
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

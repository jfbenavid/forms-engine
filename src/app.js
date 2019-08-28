import React from 'react'
import DynamicForm from './forms'
import { sm, md } from './bootstrapClasses'

const model = [
  { keys: 'name', label: 'Name', props: { required: true }, className: [sm[6], md[6]], defaultValue: 'sddf' },
  { keys: 'rating', label: 'Rating', type: 'number', props: { min: 0, max: 5 }, className: [md[6]], defaultValue: '0' },
  {
    keys: 'drop',
    label: 'DropDown',
    type: 'select',
    props: { required: true },
    defaultValue: 'yes',
    options: [
      { key: 1, value: 'test 1' },
      { key: 2, value: 'test 2' },
      { key: 3, value: 'test 3' }
    ],
    className: [md[9]]
  },
  {
    keys: 'decide',
    label: 'Radio',
    type: 'radio',
    inline: false,
    className: [md[3]],
    defaultValue: 'yes',
    options: [
      { key: 'yes', value: 'yes' },
      { key: 'no', value: 'no' }
    ]
  },
  {
    keys: 'deciding',
    label: 'Checkbox',
    type: 'checkbox',
    inline: false,
    className: [md[3]],
    options: [
      { key: 'yes', value: 'yes', checked: true },
      { key: 'no', value: 'no' }
    ]
  }
]

const handleSubmit = model => {
  console.log(JSON.stringify(model))
}

export const App = () => {
  return (
    <DynamicForm model={model} handleSubmit={model => handleSubmit(model)} />
  )
}

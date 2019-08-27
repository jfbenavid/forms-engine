import React from 'react'
import DynamicForm from './forms'

const model = [
  [
    { key: 'name', label: 'Name', props: { required: true }, cols: { sm: 12, md: 6 } },
    { key: 'age', label: 'Age', type: 'number', props: { required: true }, cols: { md: 6 } }
  ],
  [
    { key: 'rating', label: 'Rating', type: 'number', props: { min: 0, max: 5 }, cols: { md: 3 } },
    {
      key: 'drop',
      label: 'DropDown',
      type: 'select',
      props: { required: true },
      options: [
        { key: 1, value: 'test 1' },
        { key: 2, value: 'test 2' },
        { key: 3, value: 'test 3' }
      ],
      cols: { md: 9 }
    }
  ],
  [
    { key: 'qualification', label: 'Qualification', cols: { md: 6 } },
    { key: 'radio1', label: 'radio 1', type: 'radio', cols: { md: 3 }, props: { name: 'radio' }, value: 1 },
    { key: 'radio2', label: 'radio 2', type: 'radio', cols: { md: 3 }, props: { name: 'radio' }, value: 2 }
  ]
]

const handleSubmit = model => {
  console.log(JSON.stringify(model))
}

export const App = () => {
  return (
    <DynamicForm model={model} handleSubmit={model => handleSubmit(model)} />
  )
}

import React from 'react'
import { connect } from 'react-redux'
import DynamicForm from './forms'
import { sm, md, xs } from './bootstrapClasses'

const model = [
  { keys: 'name', label: 'Name', props: { required: true, placeholder: 'testing placeholder' }, className: [sm[6], md[6]], value: 'text test' },
  { keys: 'rating', label: 'Rating', type: 'number', props: { min: 0, max: 5 }, className: [md[6]], value: '0' },
  {
    keys: 'drop',
    label: 'DropDown',
    type: 'select',
    props: { required: true },
    unselectedText: 'Select an option',
    hiddenUnselected: true,
    disabledUnselected: false,
    value: 'default',
    options: {
      uri: 'films/',
      keyName: 'title',
      valueName: 'episode_id',
      uriResponsePropertyName: 'results'
    },
    className: [md[8], sm[6]]
  },
  {
    keys: 'radio',
    label: 'Radio',
    type: 'radio',
    inline: true,
    className: [md[2], sm[3], xs[6]],
    value: 'yes',
    options: [
      { key: 'yes', value: 'yes' },
      { key: 'no', value: 'no' }
    ]
  },
  {
    keys: 'check',
    label: 'Checkbox',
    type: 'checkbox',
    inline: false,
    className: [md[2], sm[3], xs[6]],
    value: ['no'],
    options: [
      { key: 'yes', value: 'yes', checked: true },
      { key: 'no', value: 'no' }
    ]
  },
  {
    keys: 'drop2',
    label: 'Dependency DropDown',
    type: 'select',
    props: { required: true },
    unselectedText: 'Select an option',
    hiddenUnselected: false,
    disabledUnselected: false,
    value: 'default',
    depends: 'drop',
    dependentUrl: 'https://swapi.co/api/films/',
    className: [md[8], sm[6]]
  }
]

const handleSubmit = model => {
  console.log(JSON.stringify(model))
}

// const getCharacter = x => new Promise((resolve, reject) => )

const App = () => {
  return (
    <DynamicForm title='testing' model={model} handleSubmit={model => handleSubmit(model)} />
  )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, null)(App)

import { sm, md, xs } from '../bootstrap-classes'

export const model = [
  { id: 'name', label: 'Name', props: { required: true, placeholder: 'testing placeholder' }, className: [sm[6], md[6]], value: 'text test' },
  { id: 'rating', label: 'Rating', type: 'number', props: { min: 0, max: 5 }, className: [md[6]], value: '0' },
  {
    id: 'drop',
    label: 'DropDown',
    type: 'select',
    props: { required: true },
    unselectedText: 'Select an option',
    hiddenUnselected: true,
    disabledUnselected: false,
    value: '1',
    fillOptions: {
      uri: 'films/',
      displayKeyName: 'title',
      valueKeyName: 'episode_id',
      uriResponsePropertyName: 'results'
    },
    options: [],
    className: [md[8], sm[6]]
  },
  {
    id: 'radio',
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
    id: 'check',
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
    id: 'drop2',
    label: 'Dependency DropDown',
    type: 'select',
    props: { required: true },
    unselectedText: 'Select an option',
    hiddenUnselected: false,
    disabledUnselected: false,
    value: 'default',
    depends: {
      from: 'drop',
      uri: 'films',
      displayKeyName: 'title',
      valueKeyName: 'episode_id',
      uriResponsePropertyName: 'results'
    },
    options: [],
    className: [md[8], sm[6]]
  }
]

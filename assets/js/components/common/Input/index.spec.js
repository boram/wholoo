import Input, { InnerInput, ErrorMessage } from './'

describe('<Input />', () => {
  let input
  let innerInput

  const props = {
    name: 'email',
    placeholder: 'Enter your email',
    type: 'email',
    value: 'test@example.com',
    onChange: () => null,
  }

  context('by default', () => {
    beforeEach(() => {
      input = shallow(<Input {...props} />)
    })

    it('passes props to <InnerInput />', () => {
      innerInput = input.find(InnerInput)
      expect(innerInput.prop('name')).toBe(props.name)
      expect(innerInput.prop('placeholder')).toBe(props.placeholder)
      expect(innerInput.prop('type')).toBe(props.type)
      expect(innerInput.prop('value')).toBe(props.value)
      expect(innerInput.prop('onChange')).toBe(props.onChange)
    })
  })

  context('when there is an error message', () => {
    beforeEach(() => {
      props.errorMessage = 'has invalid format'
      input = shallow(<Input {...props} />)
    })

    it('renders <ErrorMessage />', () => {
      const errorMessage = input.find(ErrorMessage)
      expect(errorMessage.prop('children')).toMatch(props.errorMessage)
    })
  })
})

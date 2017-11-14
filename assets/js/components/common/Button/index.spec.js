import Button from './'

describe('<Button />', () => {
  let button
  let label

  beforeEach(() => {
    label = 'Sign up'
    button = shallow(<Button>{label}</Button>)
  })

  it('renders label text', () => {
    expect(button.prop('children')).toMatch(label)
  })
})

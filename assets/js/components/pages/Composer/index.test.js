import Composer from './'

describe('<Composer />', () => {
  let composer

  beforeEach(() => {
    composer = shallow(<Composer />)
  })

  test('renders dummy text', () => {
    expect(composer.length).toBe(1)
  })
})

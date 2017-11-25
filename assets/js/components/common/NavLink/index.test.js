import NavLink from './'

describe('<NavLink />', () => {
  let navLink
  let url
  let children

  beforeEach(() => {
    url = 'http://example.com/index.html'
    children = 'link text'

    navLink = shallow(
      <NavLink url={url}>
        {children}
      </NavLink>
    )
  })

  test('sets props', () => {
    expect(navLink.prop('to')).toBe(url)
    expect(navLink.prop('exact')).toBe(true)
    expect(navLink.prop('activeClassName')).toBe('selected')
  })

  test('renders children', () => {
    expect(navLink.prop('children')).toBe(children)
  })
})

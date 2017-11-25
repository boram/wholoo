import Link from './'

describe('<Link />', () => {
  let link
  let onClickSpy
  const children = 'link text'

  beforeEach(() => {
    onClickSpy = jest.fn()

    link = shallow(
      <Link onClick={onClickSpy}>
        {children}
      </Link>
    )
  })

  test('renders children', () => {
    expect(link.prop('children')).toBe(children)
    expect(link.prop('onClick')).toBe(onClickSpy)
  })

  describe('when clicked', () => {
    beforeEach(() => {
      link.simulate('click')
    })

    test('invokes onClick', () => {
      expect(onClickSpy).toHaveBeenCalled()
    })
  })
})

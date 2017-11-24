import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow, mount } from 'enzyme'
import fetchMock from 'fetch-mock'

Enzyme.configure({ adapter: new Adapter() })

global.React = React
global.shallow = shallow
global.mount = mount
global.fetchMock = fetchMock

import React from 'react'
import { shallow, mount } from 'enzyme'
import fetchMock from 'fetch-mock'

global.React = React
global.shallow = shallow
global.mount = mount
global.fetchMock = fetchMock

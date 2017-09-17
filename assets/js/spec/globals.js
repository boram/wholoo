import React from 'react'
import { shallow, mount } from 'enzyme'
import fetchMock from 'fetch-mock'
import expect, { createSpy, spyOn } from 'expect'

global.React = React
global.shallow = shallow
global.mount = mount
global.expect = expect
global.createSpy = createSpy
global.spyOn = spyOn
global.fetchMock = fetchMock

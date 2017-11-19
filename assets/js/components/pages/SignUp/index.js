import React from 'react'
import Layout from 'common/layouts/LoggedOut'
import H2 from 'common/H2'
import FormWithData from './Form'

const SignUp = () => (
  <Layout>
    <div>
      <H2>Sign up</H2>
      <FormWithData />
    </div>
  </Layout>
)

export default SignUp

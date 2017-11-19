import React from 'react'
import Layout from 'common/layouts/LoggedIn'
import BaseH2 from 'common/H2'

const H2 = BaseH2.extend`
  margin-top: 0;
`

const Dashboard = () => (
  <Layout>
    <div>
      <H2>Dashboard</H2>
    </div>
  </Layout>
)

export default Dashboard

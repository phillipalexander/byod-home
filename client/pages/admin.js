import m from 'mithril'

import Layout from '../components/admin/layout'
import Dashboard from '../components/admin/dashboard'

m.route.prefix('')

m.route(document.getElementById('app'), '/admin', {
  '/admin': Layout(Dashboard)
})

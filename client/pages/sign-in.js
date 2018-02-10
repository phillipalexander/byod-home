import m from 'mithril/hyperscript'
import mount from 'mithril/mount'

import SignInForm from '../components/sign-in'

mount(document.getElementById('app'), {
  view: () =>
    m('.flex-centered.fill',
      m(SignInForm)
    )
})

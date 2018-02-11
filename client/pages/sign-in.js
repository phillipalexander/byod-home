import m from 'mithril'

import SignInForm from '../components/sign-in'

m.mount(document.getElementById('app'), {
  view: () =>
    m('.flex-centered.fullscreen',
      m(SignInForm)
    )
})

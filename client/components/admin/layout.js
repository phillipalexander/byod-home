import m from 'mithril'

var user = null

m.request('/session/me').then(_ => user = _)


export default (Page) => ({
  oninit(vnode) {
    // vnode.state.page =
  },
  view(vnode) {
    return m('.d-flex.flex-justify-center.fullscreen',

      m('.sidebar.m-2',
        m('ul.menu', {
            style: `transform: none;`
          },
          m('li.menu-item',
            m('.tile.tile-centered',
              m('.tile-icon',
                m('img.avatar', { src: user ? user.avatar_url : blankAvatarUrl })
              ),
              m('.tile-content', user ? user.name : 'Loading'),
            ),
          ),
          m('li.menu-item',
            m('a[href=#]', "Dashboard"),
          ),
          m('li.divider[data-content="SETTINGS"]'),
          m('li.menu-item',
            m('a[href=#]', "BYOD Apps"),
          ),
          m('li.menu-item',
            m('a[href=#]', "My Account"),
          ),
        )
      ),

      m('.body-content.mw-med.m-2.ml-0.flex',
        user && m(Page, { user: user })
      )
    )
  }
})

var blankAvatarUrl = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y'

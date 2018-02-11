import m from 'mithril'
import {appIcons, question} from '../../lib/icon'


var bapps = null

m.request('/admin/_api/bapp-stats').then(_ => bapps = _)


export default {
  view(vnode) {
    return m('.padding',
      m('h1', "Home"),

      m('h3', "Installed Apps"),

      bapps && bapps.map( app =>
        m('.tile.tile-centered',
          m('.tile-icon', m('.icon', appIcons[app.icon] || question)),
          m('.tile-content',
            m('.tile-title', app.name),
            m('.tile-subtitle.text-gray', app.id),
          ),
          m('.tile-action',
            m('button.btn', "Manage")
          )
        )
      ),

    )
  }
}

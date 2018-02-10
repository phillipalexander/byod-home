import m from 'mithril/hyperscript'


export default {
  view(vnode) {
    return m('.centered.card', {
      style: `
        min-width: 14rem;
        box-shadow: 0px 1px 2px rgba(0,0,0,0.2);
        margin-bottom: 13vh;
      `
    },
      m('.card-header',
        m('.card-title.h5.text-center', "BYOD Home"),
        m('.card-subtitle.text-gray.text-center', "Sign In"),
      ),

      m('.card-body.pt-0',
        m('.form-group',
          m('label.form-label[for=email]', "Email"),
          m('input.form-input#email[type=text]'),
        ),

        m('.form-group',
          m('label.form-label[for=password]', "Password"),
          m('input.form-input#password[type=password]'),
        ),

        m('button.btn.btn-primary.btn-block.mb-2', "Sign In"),

        m('.text-center',
          m('a.text-center[href=#]', "Don't have an account?"),
        ),
      ),
    )
  }
}

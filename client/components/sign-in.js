import m from 'mithril'

//
// Since there won't be multiple signin components at one time
// we can keep things simple and use plain vars, thanks to mithril.
//
var email = ''    || 'a@b.com' // prototype
var password = '' || '123' // prototype
var errorMsg = null

async function submit (e) {
  e.preventDefault()
  errorMsg = null

  try {
    var body = await m.request({
      method: 'POST',
      url: '/session',
      data: { email, password },
    })
    console.log("Got response?", body)
    window.location = body.next
  }
  catch (err) {
    if ( err.reason === 'invalid_creds' ) {
      errorMsg = 'Incorrect email or password.'
    }
    else {
      console.log("Unknown sign in error:", err)
      errorMsg = 'Unknown error :('
    }
  }
}

export default {

  view(vnode) {
    return m('form.centered.card', {
      style: `
        min-width: 14rem;
        box-shadow: 0px 1px 2px rgba(0,0,0,0.2);
        margin-bottom: ${errorMsg ? 9 : 13}vh;
      `,
      onsubmit: submit,
    },
      m('.card-header',
        m('.card-title.h5.text-center', "BYOD Home"),
        m('.card-subtitle.text-gray.text-center', "Sign In"),
      ),

      m('.card-body.pt-0',
        m('.form-group',
          m('label.form-label[for=email]', "Email"),
          m('input.form-input#email[type=email]', {
            value: email,
            onchange: e => email = e.target.value,
          }),
        ),

        m('.form-group',
          m('label.form-label[for=password]', "Password"),
          m('input.form-input#password[type=password]', {
            value: password,
            onchange: e => password = e.target.value,
          }),
        ),

        errorMsg && m('.toast.toast-error.mb-2.text-center', errorMsg),

        m('button[type=submit].btn.btn-primary.btn-block.mb-2', "Sign In"),

        m('.text-center',
          m('a.text-center[href=#]', "Don't have an account?"),
        ),
      ),
    )
  }
}

## BYOD - Bring Your Own Data

BYOD is an aspiring movement and ecosystem where users take back control of their data. In return, developers can build useful apps without having to worry about scaling.

Current status: Prototype, in development

## Concepts

- **User** - A normal internet user.
- **BYOD Home** - A server that houses a user's data for potentially many apps.
- **BYOD App** (or Bapp for short) - An app that stores its data in a BYOD Home.
- **Developer** - The developer that creates and maintains their respective BYOD App.

A BYOD Home is where a user's data lives. With a BYOD Home, a user may sign into a Bapp, kicking off the following:

- Bapp requests access to user's BYOD Home via OAuth.
- User accepts or rejects.
- If accept, Home creates an isolated database for Bapp.
- Bapp gains an access token to read and write to this database (via an HTTP API).

Once a Bapp has an access token, they are free to create and read data as it sees fit to best serve the user. Because there is no central database, a Bapp does not need to worry about scaling, and can even be a CDN-delivered static SPA.

A BYOD Home can host data for any number of Bapps, so the user only needs to pay for their Home's server hosting costs.

## Example Use Cases

Historically, many useful apps have shut down due to the hosting costs associated with the scale of their popularity. This includes:

- pastie.org, a snippet pasting website
- etherpad, a realtime, collaborative text editor
- del.icio.us, a bookmarking website
- Others? Submit a PR :)

With the BYOD system, as a developer you can write your own bookmarking Bapp and not have to worry about such costs. As a user, you won't have to worry about a website shutting down and losing your data.

## Endpoint Plan

First run will expose a key-value HTTP API:

```txt
POST /v1/d/:path*
  Create a datapoint at a specified path

GET /v1/d/:id
  Get latest version of a datapoint

GET /v1/apps/:path*
  Get all datapoints at a specified path
```

## Development

```bash
$ npm install
$ npm run dev
```

### Philosophy

- Low tech server-side
- Mild tech client-side

## Credits

splash.jpg photo by NordWood Themes

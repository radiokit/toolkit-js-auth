# RadioKit JS Toolkit: Authentication

High-level JavaScript API for performing authentication against RadioKit systems.

# Development

* Clone the repo
* Enter dir with the project
* Install NPM packages: `npm install`

# Building

* Type `npm run build-browser`

Browser-compatible version will be located in `dist/browser/`.

# Sample usage

Then you can type in the browser console e.g.

```javascript
RadioKitToolkitAuth.Session.User.authenticateAsync('a@a.pl', 'pass')
  .then((session) => {
    console.log('accessToken', session.getAccessToken());
    console.log('user', session.getUser());
  })
  .error(reason) => {
    throw new reason;
  }
```

# Authors

Marcin Lewandowski <marcin@radiokit.org>

# License

MIT

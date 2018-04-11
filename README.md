# neutrine-router

> Micro router for React.

[![npm](https://img.shields.io/npm/v/neutrine-router.svg?style=flat-square)](https://www.npmjs.com/package/neutrine-router)
[![npm](https://img.shields.io/npm/dt/neutrine-router.svg?style=flat-square)](https://www.npmjs.com/package/neutrine-router)
[![npm](https://img.shields.io/npm/l/neutrine-router.svg?style=flat-square)](https://github.com/siimple/neutrine-router)
[![pr](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()

**NOTE**: this package is on development.  

`neutrine-router` is a micro-router component for building Single Page Applications (SPA) with React. 

`neutrine-router` uses the **hashbang** as the routing strategy. This strategy uses an exclamation mark after the hash to indicate that the hash is used for routing. A tipically url with a *hashbang* looks like: 

```
http://example.com/#!/about/contact
```
 

## Installation 

Use `npm` to install the package:

```bash
$ npm install --save neutrine-router
```

## Usage


 

## API 

Import in your ES6 module:

```javascript
import * as Router from "neutrine-router";
```

### Router.App

`Router.App` is an abstract class that extends `React.Component`, but with the difference that the `render` method will be callend when the hashbang of your site changes..

```javascript
import * as Router from "neutrine-Router";

class App extends Router.App {
    render() {
        //Here goes your content
    }
}
```

### Router.Switch

A component that renders the first child `Route` that matches the current 

## License

Released under the [MIT LICENSE](./LICENSE).


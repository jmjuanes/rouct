# neutrine-router

> Micro router for React.

[![npm](https://img.shields.io/npm/v/neutrine-router.svg?style=flat-square)](https://www.npmjs.com/package/neutrine-router)
[![npm](https://img.shields.io/npm/dt/neutrine-router.svg?style=flat-square)](https://www.npmjs.com/package/neutrine-router)
[![npm](https://img.shields.io/npm/l/neutrine-router.svg?style=flat-square)](https://github.com/siimple/neutrine-router)
[![pr](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()

**NOTE**: this package is on development.  

`neutrine-router` is a micro-router component for building Single Page Applications (SPA) with React. 

It uses the **hashbang** as the routing strategy. This strategy uses an exclamation mark after the hash to indicate that the hash is used for routing. A tipically url with a *hashbang* looks like: 

```
http://example.com/#!/about/contact
```
 

## Installation 

Use `npm` to install the package:

```bash
$ npm install --save neutrine-router
```

## Simple usage

Import `neutrine-router` in your ES6 module:

```javascript
import * as Router from "neutrine-router";
```

Create a class that extends `Router.App`. This class will call automatically the `render()` method when the `hash` portion of your url changes.

```javascript
class MyApp extends Router.App {
    
}
```

Implement the `render()` method in your new class. Use the `Router.Switch` component to find the route that matches the current location, and the `Router.Route` component to define which componet will be rendered when the current location matches the route's path. 

```javascript
class MyApp extends Router.App {
    render() {
        return (
            <Router.Switch>
                <Router.Route exact path="/" component={HomePage}>
            </Router.Switch>
        );
    }
}
``` 

Now implement your `HomePage` component that will be rendered when the user navigates to the root of your website:

```javascript
class HomePage extends React.Component {
    render() {
        return <div>Hello world!</div>
    }
}
```


## API 

### Router.App

`Router.App` is an abstract class that extends `React.Component`, with the addition that the `render()` method will be called when the *hash* string of your site changes.

```javascript
import * as Router from "neutrine-Router";

class App extends Router.App {
    render() {
        //Here goes your content
    }
}
```

### Router.Switch

A component that renders the first child `Router.Route` that matches the current location. 


### Router.Route


The `Router.Route` component expects the following props:

##### `path`

A `string` that describes the pathname that the route matches. When the current location matches the route's path, the component specified by the `component` prop is rendered.

The `path` can also be a dynamic path string, using named parameters prefixed by a colon to the parameter name. For example, the path `/user/:name` matches `/user/bob` and `user/susan`. The captured values are stored in the `request.params` object passed as a property to the rendered component.

##### `component`

A React component that should be rendered when the route matches. This component will be called with the props passed from the `props` property of the Route. Also, a `request` object will be passed as a prop with the following entries: 

- `path`: a `string` with the full matched path.
- `pathname`: a `string` with the part of the URL before the start of the `query`.
- `query`: an `object` that contains all query-string parameters in the matched path. Default is an empty object `{}`.
- `params`: an `object` that contains all parsed properties extracted from the dynamic parts of the path. Default is an empty object `{}`.

##### `props`

**Optionally** An `object` with the extra props that should be passed to the rendered `component` when the route matches.

##### `exact`

**Optionally** A `boolean` used to ensure that the route's path is an exact match of the current location. Default is `false`.

| Router's path | Current path | Exact is active? | Matches? |
|---------------|--------------|------------------|----------|
| `/`           | `/one/two`   | Yes              | No       |
| `/`           | `/one/two`   | No               | Yes      | 
| `/one`        | `/one/two`   | Yes              | No       |
| `/one/`       | `/one/two`   | No               | Yes      |
| `/one/two`    | `/one/two`   | Yes              | Yes      |
| `/one/two`    | `/one/two`   | No               | Yes      |


## License

Released under the [MIT LICENSE](./LICENSE).


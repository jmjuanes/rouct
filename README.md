# rouct

> Micro client-side routing component for React.

[![npm](https://img.shields.io/npm/v/rouct.svg?style=flat-square)](https://www.npmjs.com/package/rouct)
[![npm](https://img.shields.io/npm/dt/rouct.svg?style=flat-square)](https://www.npmjs.com/package/rouct)
[![npm](https://img.shields.io/npm/l/rouct.svg?style=flat-square)](https://github.com/jmjuanes/rouct)
[![pr](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()


> **IMPORTANT NOTE**
> This package is on development, so and its use will be under your own risk. 
> At this moment only the hashbang strategy has been implemented. We are working on the implementation of more routing strategies. 

**Rouct** is a micro client-side routing component for building **single page applications** (SPA for short) with [React](https://www.reactjs.org). 

**Rouct** is based on the new **Context API** of [**React 16.3.0**](https://reactjs.org/docs/context.html), so this package only works with versions of React higher than `16.3.0`.

## Installation 

Use `npm` to install the package:

```bash
$ npm install --save rouct
```

You can now import `rouct` in your ES6 module:

```javascript
import * as Rouct from "rouct";
```

Or include it in your HTML file:

```html
<script type="text/javascript" src="./node_modules/react/umd/react.development.js"></script>
<script type="text/javascript" src="./node_modules/react-dom/umd/react-dom.development.js"></script>
<script type="text/javascript" src="./node_modules/rouct/umd/rouct.js"></script>
```

## Example

There is an example of a simple website using `rouct` with the **hashbang** routing strategy.

```jsx
import React from "react";
import * as Rouct from "rouct";

// Main component
class App extends React.Component {
    render() {
        return (
            <ul>
                <li onClick={() => Rouct.redirectHashbang("/"); }>Home</li>
                <li onClick={() => Rouct.redirectHashbang("/products"); }>Products</li>
                <li onClick={() => Rouct.redirectHashbang("/about"); }>About</li>
            </ul>
            <hr/>
            <Rouct.HashbangRouter>
                <Rouct.Switch>
                    <Rouct.Route exact path="/" component={HomePage}/>
                    <Rouct.Route path="/products" component={ProductsPage}/>
                    <Rouct.Route exact path="/about" component={AboutPage}/>
                    <Rouct.Route path="*" component={NotFound}/>
                </Rouct.Switch>
            </Rouct.HashbangRouter>
        );
    }
}

// The HomePage component will be rendered when the user navigates to the root ('/' or '#!/')
class HomePage extends React.Component {
    render() {
        return (
            <h2>Welcome</h2>
            <div>Welcome to our page</div>
        );
    }
}

// The Products page will be rendered when the user navigates to '#!/products'. 
// This component will also catch any path that starts with '#!/products' 
// (note that the 'exact' attribute is not used in the products route of the App component).
class ProductsPage extends React.Component {
    render() {
        return (
            <h2>Products</h2>
            <ul>
                <li onClick={() => Rouct.redirectHashbang("/products/product1"); }>Product 1</li>
                <li onClick={() => Rouct.redirectHashbang("/products/product2"); }>Product 2</li>
            </ul>
            <Rouct.Route exact path="/products" component={EmptyProductPage}/>
            <Rouct.Route exact path="/products/:product" component={DetailProductPage}/>
        );
    } 
}

class DetailProductPage extends React.Component {
    render() {
        let product = this.props.request.params.product;
        return (
            <h5>{product}</h5>
            <div>Here goes the product description</div>
        );
    }
}

class EmptyProductPage extends React.Component {
    render() {
        return <div>Please select a product from the list</div>;
    }
}

//The AboutPage component will be rendered when the user navigates to '#!/about'
class AboutPage extends React.Component {
    render() {
        return <h2>About</h2>;
    }
}

// The NotFound component will be rendered when the user navigates to another url not listed above
class NotFound extends React.Component {
    render() {
        return <h2>Not found</h2>;
    }
}
```


## API 

### Rouct.Router

The base component that is used by the router navigation strategies. Typically you should use `HashbangRouter` instead. Only use this component if you are going to implement your own navigation strategy.

This component accepts the following props:

- `location`: a `string` with the current location. The `Router` component will propague this location its `Route` and `Switch` children components.

```jsx
class App extends React.Component {
    constructor(super) {
        super(props);
        this.state = {location: "/"};
    }
    
    render() {
        return (
            <Rouct.Router location={this.state.location}>
                <Rouct.Route path="/" component={Home}/>
            </Rouct.Router>
    }
}
```

### Rouct.Switch

A component that renders the first child `Rouct.Route` that matches the current location. 

```jsx
<Rouct.Switch>
    <Rouct.Route exact path="/" component={HomePage}/>
    <Rouct.Route path="/services" component={ServicesPage}/>
    <Rouct.Route exact path="/about" component={AboutPage}/>
    <Rouct.Route path="*" component={NotFound}/>
</Rouct.Switch>
```

### Rouct.Route

A React component that is used to assign a path to a component that should be rendered if the current path matches the route path.

```jsx
<Rouct.Route exact path="/" component={HomePage}/>
<Rouct.Route exact path="/about" component={AboutPage}/>
<Rouct.Route exact path="/portfolio" component={PortfolioPage}/>
```

The `Rouct.Route` component expects the following props:

##### `path`

A `string` that describes the pathname that the route matches. When the current location matches the route's path, the component specified by the `component` prop is rendered.

```jsx
<Rouct.Route path="/about/contact" component={ContactPage}/>
```

The `path` can also be a dynamic path string, using named parameters prefixed by a colon to the parameter name. For example, the path `/user/:name` matches `/user/bob` and `user/susan`. The captured values are stored in the `request.params` object passed as a property to the rendered component.

```jsx
<Rouct.Route path="/user/:name" component={UserManagement}/>
```

You can also create a catch-all route setting the `path` value to `*`:

```jsx
<Rouct.Route path="*" component={NotFoundPage}/>
``` 

> **Important note**: query strings are not part of the route path.
 

##### `component`

A React component that should be rendered when the route matches. This component will be called with the props passed from the `props` property of the Route. Also, a `request` object will be passed as a prop with the following entries: 

- `path`: a `string` with the full matched path.
- `pathname`: a `string` with the part of the URL before the start of the `query`.
- `query`: an `object` that contains all query-string parameters in the matched path. Default is an empty object `{}`.
- `params`: an `object` that contains all parsed properties extracted from the dynamic parts of the path. Default is an empty object `{}`.

##### `props`

**Optionally** An `object` with the extra props that should be passed to the rendered `component` when the route matches.

```jsx
let homeProps = {
    title: "Hello world!"
};
<Rouct.Route path="/" component={HomePage} props={homeProps}/>
```

##### `exact`

**Optionally** A `boolean` used to ensure that the route's path is an exact match of the current location. Default is `false`.

| Router's path | Current path | Is Exact active? | Matches? |
|---------------|--------------|------------------|----------|
| `/`           | `/one/two`   | Yes              | No       |
| `/`           | `/one/two`   | No               | Yes      | 
| `/one`        | `/one/two`   | Yes              | No       |
| `/one/`       | `/one/two`   | No               | Yes      |
| `/one/two`    | `/one/two`   | Yes              | Yes      |
| `/one/two`    | `/one/two`   | No               | Yes      |


### Hashbang routing

The **hashbang** routing strategy adds an exclamation mark after the hash to indicate that the hash is used for routing. A tipically url with a *hashbang* looks like: 

```
http://example.com/#!/about/contact
```

Using this strategy is guaranteed to work in browsers that do not support `history.pushState` (of course, IE9 and).

#### Rouct.HashbangRouter

A `Rouct.Router` component that listens to any changes in the hash portion of your URL and propagates the new URL to any children of the type `Rouct.Switch` and `Rouct.Route`.

```jsx
class App extends React.Component {
    render() {
        return (
            <Rouct.HashbangRouter> 
                {/* Place here your children components */}
            </Rouct.HashbangRouter>
        );
    }
}
```

Note that you should user only one `Rouct.HashbangRouter` component in your application to avoid unexpected behavior.


#### Rouct.redirectHashbang(url)

Use this function to change the hash segment with the provided path. This function automatically adds the exclamation mark to the path after the hash.  

```jsx
class Menu extends React.Component {
    render() {
        return (
            <div className="menu">
                <a onClick={() => Rouct.redirectHashbang("/");}>Home</a>
                <a onClick={() => Rouct.redirectHashbang("/about");}>About</a>
                <a onClick={() => Rouct.redirectHashbang("/portfolio");}>Portfolio</a>
            </div>
        );
    }
}
```


## License

Released under the [MIT LICENSE](./LICENSE).


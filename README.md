# rouct

> Micro client-side routing component for React.

[![npm](https://img.shields.io/npm/v/rouct.svg)](https://www.npmjs.com/package/rouct)
[![npm](https://img.shields.io/npm/dt/rouct.svg)](https://www.npmjs.com/package/rouct)
[![npm](https://img.shields.io/npm/l/rouct.svg)](https://github.com/jmjuanes/rouct)


**Rouct** is a micro client-side routing component for building **single page applications** (SPA for short) with [React](https://www.reactjs.org). 

**Rouct** is based on the new **Context API** of [**React 16.3.0**](https://reactjs.org/docs/context.html), so this package only works with versions of React higher than `16.3.0`.

## Installation 

Use **npm** or **yarn** to install the package:

```bash
## Install using NPM:
$ npm install --save rouct

## Install using YARN:
$ yarn add rouct
```

You can now import `rouct` in your ES6 module:

```javascript
import Rouct from "rouct";
```

## Example

There is an example of a simple website using `rouct` with the **hashbang** routing strategy.

```jsx
import React from "react";
import Rouct from "rouct";

// Main component
class App extends React.Component {
    render() {
        return (
            <ul>
                <li onClick={() => Rouct.redirect("/"); }>Home</li>
                <li onClick={() => Rouct.redirect("/products"); }>Products</li>
                <li onClick={() => Rouct.redirect("/about"); }>About</li>
            </ul>
            <hr/>
            <Rouct.Router routing={Rouct.HashbangRouting}>
                <Rouct.Switch>
                    <Rouct.Route exact path="/" component={HomePage}/>
                    <Rouct.Route path="/products" component={ProductsPage}/>
                    <Rouct.Route exact path="/about" component={AboutPage}/>
                    <Rouct.Route path="*" component={NotFound}/>
                </Rouct.Switch>
            </Rouct.Router>
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
                <li onClick={() => Rouct.redirect("/products/product1"); }>Product 1</li>
                <li onClick={() => Rouct.redirect("/products/product2"); }>Product 2</li>
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

The base routing component. You should only use one `<Rouct.Router>` component in your application.

This component accepts the following props:

- `rouging`: one of the routing methods provided by Rouct (`Rouct.HashbangRouting` or `Rouct.BrowserRouting`). The router component will save the selected method and use it for the redirect function.
- `pathPrefix`: a prefix added to all paths on the site. Default is `/`.

```jsx
<Rouct.Router routing={Rouct.BrowserRouting}>
    <Rouct.Route path="/" component={Home}/>
</Rouct.Router>
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

This component accepts a `reset` prop (added in `v0.3.0`): if `true`, the matched route will be rendered again when path changes (default set to `false`).


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

##### `render`

A function that will be called when the route matches. This prop can not be uswd with the `component` property.

```jsx
<Rouct.Route path="/" render={function () {
    return "Hello world";
}} />
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


### Rouct.recirect(url)

Use this function to change the URL with the provided path. This function uses the routing method provided in the `<Rouct.Router>` component.

```jsx
class Menu extends React.Component {
    render() {
        return (
            <div className="menu">
                <a onClick={() => Rouct.redirect("/");}>Home</a>
                <a onClick={() => Rouct.redirect("/about");}>About</a>
                <a onClick={() => Rouct.redirect("/portfolio");}>Portfolio</a>
            </div>
        );
    }
}
```


### Rouct.BrowserRouting

The **browser history** routing strategy is based on the HTML5 history API (`history.pushState` and `popstate` event listener). 

```jsx
class App extends React.Component {
    render() {
        return (
            <Rouct.Router routing={Rouct.BrowserRouting}> 
                {/* Place here your children components */}
            </Rouct.Router>
        );
    }
}
```

### Rouct.HashbangRouting

The **hashbang** routing strategy adds an exclamation mark after the hash to indicate that the hash is used for routing. A tipically url with a *hashbang* looks like: 

```
http://example.com/#!/about/contact
```

Using this strategy is guaranteed to work in browsers that do not support `history.pushState` (of course, IE9 and older versions).



## License

Released under the [MIT LICENSE](./LICENSE).



## v0.3.0 (2020-03-28)

- Changed export type: now **Rouct** can be imported using `import Rouct from "rouct";`.
- Added `reset` property to `Switch` component for reloading the rendered route when path changes.
- Fixed minor bugs rendering `Route` component.


## v0.2.1 (2019-10-31)

- Fixed `Switch` component to return the last child component if no route matches the current path.
- Minor improvements.

## v0.2.0 (December 9, 2018)

- Add Browser History routing based on HTML5 history API.

## 0.1.2 (October 31, 2018)

- Remove React as a dependency. Minor changes.

## 0.1.1 (June 3, 2018)

- Fixed bug getting the current hash string.

## 0.1.0 (May 1, 2018)

- Implemented base `Router` component based on the new [Context API](https://reactjs.org/docs/context.html) of React `16.3.0`.
- Implemented `HashbangRouter` component that extends the base `Router` component and listens to any changes on the hash portion of the URL.
- Renamed `redirect` method to `rediredtHashbang`.
- Allow `Router` component to be used outside of a `Switch` component.


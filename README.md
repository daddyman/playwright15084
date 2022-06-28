# Test

This is a reproduction for [Playwright issue 15084](https://github.com/microsoft/playwright/issues/15084).

In one window start the server and in another window run the tests.

The src/Frame.tsx file contains the code that adds and removes an iframe from the DOM
on a timer. When the timeout is set to 100 the tests fail waiting for navigation but setting
the timeout to 1000 or higher the tests pass.

The tests fail during a page.waitForNavigation which doesn't complete if the iframe is
removed at a certain time while the app is trying to navigate.

## Start the server

```(sh)
npm install
npm start
```

To run the web site without the hot reloading checks

```(sh)
npm run build
npm run serve -- --port 3000
```

## Run the tests

```(sh)
npm test
```

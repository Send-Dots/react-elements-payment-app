# Card Payment using React

This sample shows how to build a card form to take a payment using the [Payment Intents API](), [Dots Elements]() and [React](https://reactjs.org/).

<img src="./demo.png" alt="Preview of recipe" align="center">

## Features

This sample consists of a `client` in React and a `server` piece.

The client is implemented using `create-react-app` to provide the boilerplate for React. Dots Elements is integrated using [`react-dots-js`](https://www.npmjs.com/package/@dots.dev/react-dots-js), which is the official React library provided by Dots.

## How to run locally

To run this sample locally you need to start both a local dev server for the `front-end` and another server for the `back-end`.

You will need a Dots account with its own set of [API keys](https://dashboard.dots.dev/api-management).

Follow the steps below to run locally.

**Installing and cloning manually**

```
git clone
```

Copy the .env.example file into a file named .env in the folder of the server you want to use. For example:

```
cp .env.example server/node/.env
```

You will need a Dots account in order to run the demo. Once you set up your account, go to the Dots [developer dashboard](https://dashboard.dots.dev/api-management) to find your API keys.

```
DOTS_CLIENT_ID=<replace-with-your-client-id>
DOTS_CLIENT_SECRET=<replace-with-your-client-secret>
```

`STATIC_DIR` tells the server where to the client files are located and does not need to be modified unless you move the server files.

### Running the API server

1. Run `npm run server`

### Running the React client

1. Run `npm run client` and your default browser should now open with the front-end being served from `http://localhost:3000/`.

### Using the sample app

When running both servers, you are now ready to use the app running in [http://localhost:3000](http://localhost:3000).

1. Enter your card details
1. Hit "Pay"
1. 🎉

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Demo

You can see demo in browser [url](https://task-app-ivashin.netlify.app/)

## Installation

```bash
yarn install
```

## Running the app

```bash
# development
$ yarn start

# production mode
$ yarn run build
```

## Test

```bash
# tests
$ yarn run test

```

## Database

I used mockApi as a database because here you can store your data in `json` format.
You need to create two tables `categories`, and `todos`.
You can find all the necessary materials here [mockApi](https://mockapi.io/docs).

### Update .env file

`REACT_APP_MOCK_API_URL=ulr`

## Eject

```bash
# eject
$ yarn run eject

```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

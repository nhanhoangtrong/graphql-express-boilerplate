# GraphQL Express Boilerplate

Boilerplate for building GraphQL API endpoints with ExpressJS and Apollo GraphQL.

## Features

* Writing ES6, ES7 using Babel
* Minimum [ExpressJS] configuration
* Passport authentication and local strategy
* Loading `.env` file
* [GraphQL] API endpoints with context object
* MongoDB with Mongoose Schema Definitions
* `mocha` testing framework
* `chai` and `chai-http` as BDD/TDD assertion

## Prerequisites

* Node: >= v6
* npm or yarn
* Redis

## Pre-install

* Copy `.env` content

```sh
cp .env-sample .env
```

* Edit `.env` content
    - `REDIS_CONNECTION_STRING`: Configures Redis server for session store
    - `HOST` and `POST`: The host and port of server to listening
    - `CORS-ORIGIN`: List of available origins to put in whitelist, separated by commas
    - Session configs include `SESSION_NAME` and `SESSION_SECRET`.
    - `MONGODB_CONNECTION_STRING`: Configure MongoDB connection uri


## Install

```sh
yarn
yarn build
yarn start
```

or

```sh
npm install
npm run build
npm start
```

## License

The MIT License

Copyright &copy; 2017 [Nhan Hoang]

[Nhan Hoang]: http://nhanhoang.info
[Yarn]: https://yarnpkg.com
[ExpressJS]: https://expressjs.com/
[GraphQL]: https://graphql.org/

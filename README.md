# GraphQL Express Boilerplate

Boilerplate for building GraphQL API endpoints with ExpressJS and Apollo GraphQL.

## Features

* Writing ES6, ES7 using Babel
* Minimum [ExpressJS] configuration
* Passport authentication and local strategy
* Users authentication
* Loading `.env` file
* [GraphQL] API endpoints with context object
* [PostgreSQL] database and [KnexJS] schema and query builder
* `jest` testing framework
* `chai` and `chai-http` as BDD/TDD assertion

## Prerequisites

* Node: >= v6
* npm or yarn
* Redis

## Pre-install

* Copy `.env` content:

```sh
cp .env-sample .env
```

* Create PostgreSQL extension for uuid:

```SQL
CREATE EXTENSION "uuid-ossp";
```

* Edit `.env` content:
    - `REDIS_CONNECTION_STRING`: Configures Redis server for session store
    - `PG_CONNECTION_STRING`: Configures [PostgreSQL] server for [KnexJS]
    - `HOST` and `POST`: The host and port of server to listening
    - `CORS-ORIGIN`: List of available origins to put in whitelist, separated by commas
    - Session configs include `SESSION_NAME` and `SESSION_SECRET`.

* Install [KnexJS] global and run latest migration:

```sh
yarn add global knex
or
npm i -g knex
knex migrate:latest --env production
```

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
[PostgreSQL]: https://www.postgresql.org/
[KnexJS]: http://knexjs.org/

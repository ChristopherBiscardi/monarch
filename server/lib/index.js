import 'babel-polyfill';

import graphqlHTTP from 'express-graphql';
import express from 'express';

// https://github.com/docker/engine-api/blob/master/types/types.go

import Schema from './Schema';

express()
  .use('/graphql', graphqlHTTP({ schema: Schema, pretty: true }))
  .listen(process.env.PORT || 3000);

console.log('GraphQL server running on http://localhost:3000/graphql');

import 'babel-polyfill';

import { GraphQLSchema } from 'graphql';
import graphqlHTTP from 'express-graphql';
import express from 'express';

import Query from './query';

// https://github.com/docker/engine-api/blob/master/types/types.go

var schema = new GraphQLSchema({
  query: Query
});

express()
  .use('/graphql', graphqlHTTP({ schema: schema, pretty: true }))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');

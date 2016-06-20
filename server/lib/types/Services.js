import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {
  globalIdField,
} from 'graphql-relay';

import { nodeInterface } from '../resolvers';
import { MetaFields, Annotations } from './common';
import { TaskSpec,
} from './Task';
import {
  NetworkAttachmentConfig,
  Endpoint,
  EndpointSpec,
} from './swarm/network';

export class Service {
  constructor(opts) {
    Object.keys(opts)
          .forEach((key, i, arr) => {
            this[key] = opts[key];
          });
  }
}

const ReplicatedService = new GraphQLObjectType({
  name: 'ReplicatedService',
  fields: {
    Replicas: { type: GraphQLInt },
  },
});

// GlobalService is a kind of ServiceMode.
// type GlobalService struct{}

const ServiceMode = new GraphQLObjectType({
  name: 'ServiceMode',
  fields: {
    Replicated: { type: ReplicatedService },
//    Global: { type: GlobalService },
  },
});
const UpdateConfig = new GraphQLObjectType({
  name: 'UpdateConfig',
  fields: {
    Parallelism: { type: GraphQLInt },
    Delay: { type: GraphQLString }, //Duration
  },
});

export const ServiceType = new GraphQLObjectType({
  name: 'Service',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField('Service', o => o.ID),
    ID: { type: new GraphQLNonNull(GraphQLString) },
    ...MetaFields,
    Spec: { type: ServiceSpec },
    Endpoint: { type: Endpoint },
  }),
});

const ServiceSpec = new GraphQLObjectType({
  name: 'ServiceSpec',
  description: 'represents the spec of a service',
  fields: {
    ...Annotations,
    TaskTemplate: { type: TaskSpec },
    Mode: { type: ServiceMode },
    UpdateConfig: { type: UpdateConfig },
    Networks: { type: new GraphQLList(NetworkAttachmentConfig) },
    EndpointSpec: { type: EndpointSpec },
  },
});

import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import Docker from 'dockerode';
const docker = new Docker();

import {
  ContainerJSONBaseType,
  ContainersType,
} from './types/Containers';
import {
  ServiceType,
} from './types/Services';

import { nodeField } from './resolvers';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    services: {
      type: new GraphQLList(ServiceType),
      resolve: (_, args) => new Promise((resolve, reject) => {
        docker.modem.dial({
          path: '/services',
          options: {},
          statusCodes: {
            200: true, // unofficial, but proxies may return it
            201: true,
            404: 'no such container',
            406: 'impossible to attach',
            500: 'server error',
          },
        }, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      }),
    },
    inspect: {
      type: ContainerJSONBaseType,
      args: {
        containerId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => new Promise((resolve, reject) => {
        docker.getContainer(args.containerId)
              .inspect((err, data) => {
                if (err) {
                  console.log('containerInspect: ', err);
                  reject(err);
                }
                resolve(data);
              });
      }),
    },
    containers: {
      type: new GraphQLList(ContainersType),
      args: {
        all: {
          type: GraphQLBoolean,
          description: 'Show all containers. Only running containers are shown by default (i.e., this defaults to false)',
        },
        limit: {
          type: GraphQLInt,
          description: 'Show limit last created containers, include non-running ones',
        },
        since: {
          type: GraphQLString,
          description: 'Show only containers created since Id, include non-running ones',
        },
        before: {
          type: GraphQLString,
          description: 'Show only containers created before Id, include non-running ones',
        },
        size: {
          type: GraphQLBoolean,
          description: 'Show the containers sizes',
        },
        filters: {
          type: new GraphQLInputObjectType({
            name: 'Filters',
            description: '',
            fields: {
              exited: {
                type: new GraphQLList(GraphQLInt),
                description: 'containers with exit code of <int>',
              },
              status: {
                type: new GraphQLList(new GraphQLEnumType({
                  name: 'StatusType',
                  values: {
                    CREATED: { value: 'created' },
                    RESTARTING: { value: 'restarting' },
                    RUNNING: { value: 'running' },
                    PAUSED: { value: 'paused' },
                    EXITED: { value: 'exited' },
                    DEAD: { value: 'dead' },
                  },
                })),
              },
            },
          }),
        },
      },
      resolve: (_, args) => new Promise((resolve, reject) => {
        console.log('args', args);
        let opts = {};
        docker.listContainers(args, (err, data) => {
          if (err) {
            console.log('containerInspect: ', err);
            reject(err);
          }
          resolve(data);
        });
      }),
    },
  },
});

export default new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    node: nodeField,
    root: {
      type: new GraphQLNonNull(Query),
      resolve: () => ({})
    },
  })
})

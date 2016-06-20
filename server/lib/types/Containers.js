import {
  GraphQLBoolean,
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

const GraphDriverData = new GraphQLObjectType({
  name: 'GraphDriverData',
  fields: {
    Name: { type: new GraphQLNonNull(GraphQLString) },
    // Data map[string]string
  },
});

const ContainerNode = new GraphQLObjectType({
  name: 'ContainerNode',
  fields: {
    Id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    IP: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Addr: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Cpus: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    Memory: {
      type: new GraphQLNonNull(GraphQLInt),
    },
//    Labels: { type: GraphQLObjectType }
  },
});
const HealthType = new GraphQLObjectType({
  name: 'HealthType',
  fields: {
    Status: {
      type: new GraphQLNonNull(GraphQLString),
    },
    FailingStreak: {
      type: new GraphQLNonNull(GraphQLInt),
    },
//    Log: { type: HealthCheckResult }
  },
});

const ContainerStateType = new GraphQLObjectType({
  name: 'ContainerStateType',
  fields: {
    Status: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Running: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    Paused: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    Restarting: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    OOMKilled: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    Dead: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    Pid: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    ExitCode: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    Error: {
      type: new GraphQLNonNull(GraphQLString),
    },
    StartedAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    FinishedAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Health: {
      type: HealthType,
    },
  },
});

export class ContainerJSONBase {
  constructor(opts) {
    Object.keys(opts)
          .forEach((key, i, arr) => {
            this[key] = opts[key];
          });
  }
}

export const ContainerJSONBaseType = new GraphQLObjectType({
  name: 'ContainerJSONBase',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField('ContainerJSONBase', o => o.Id),
    Id: { type: new GraphQLNonNull(GraphQLString) },
    Created: { type: new GraphQLNonNull(GraphQLString) },
    Path: { type: new GraphQLNonNull(GraphQLString) },
    Args: { type: new GraphQLList(GraphQLString) },
    State: { type: ContainerStateType },
    Image: { type: new GraphQLNonNull(GraphQLString) },
    ResolvConfPath: { type: new GraphQLNonNull(GraphQLString) },
    HostnamePath: { type: new GraphQLNonNull(GraphQLString) },
    HostsPath: { type: new GraphQLNonNull(GraphQLString) },
    LogPath: { type: new GraphQLNonNull(GraphQLString) },
    Node: { type: ContainerNode },
    Name: { type: new GraphQLNonNull(GraphQLString) },
    RestartCount: { type: new GraphQLNonNull(GraphQLInt) },
    Driver: { type: new GraphQLNonNull(GraphQLString) },
    MountLabel: { type: new GraphQLNonNull(GraphQLString) },
    ProcessLabel: { type: new GraphQLNonNull(GraphQLString) },
    AppArmorProfile: { type: new GraphQLNonNull(GraphQLString) },
    ExecIDs: { type: new GraphQLList(GraphQLString) },
    // HostConfig: { type: HostConfig },
    GraphDriver: { type: new GraphQLNonNull(GraphDriverData) },
    SizeRw: { type: GraphQLInt },
    SizeRootFs: { type: GraphQLInt },
  }),
});

// - list

// Port
//
const Port = new GraphQLObjectType({
  name: 'Port',
  descriptions: `Stores open ports info of container
e.g. {"PrivatePort": 8080, "PublicPort": 80, "Type": "tcp"}`,
  fields: {
    IP: { type: GraphQLString },
    PrivatePort: { type: new GraphQLNonNull(GraphQLInt) },
    PublicPort: { type: GraphQLInt },
    Type: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const NetworkMode = new GraphQLObjectType({
  name: 'NetworkMode',
  fields: {
    NetworkMode: { type: GraphQLString },
  },
});
  // SummaryNetworkSettings provides a summary of container's networks
  // in /containers/json
  /* type SummaryNetworkSettings struct {
     Networks map[string]*network.EndpointSettings
     } */

const MountPoint = new GraphQLObjectType({
  name: 'MountPoint',
  description: 'Represents a mount point configuration inside the container.',
  fields: {
    Name: { type: GraphQLString },
    Source: { type: new GraphQLNonNull(GraphQLString) },
    Destination: { type: new GraphQLNonNull(GraphQLString) },
    Driver: { type: GraphQLString },
    Mode: { type: new GraphQLNonNull(GraphQLString) },
    RW: { type: new GraphQLNonNull(GraphQLBoolean) },
    Propagation: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const ContainersType = new GraphQLObjectType({
  name: 'ContainersType',
  description: 'List containers on the system',
  fields: () => ({
    Id: { type: new GraphQLNonNull(GraphQLString) },
    Names: { type: new GraphQLList(GraphQLString) },
    Image: { type: new GraphQLNonNull(GraphQLString) },
    ImageID: { type: new GraphQLNonNull(GraphQLString) },
    Command: { type: new GraphQLNonNull(GraphQLString) },
    Created: { type: new GraphQLNonNull(GraphQLInt) },
    Ports: { type: new GraphQLList(Port) },
    SizeRw: { type: GraphQLInt },
    SizeRootFs: { type: GraphQLInt },
    //    Labels     map[string]string
    State: { type: new GraphQLNonNull(GraphQLString) },
    Status: { type: new GraphQLNonNull(GraphQLString) },
    HostConfig: { type: new GraphQLNonNull(NetworkMode) },
    //    NetworkSettings *SummaryNetworkSettings
    Mounts: { type: new GraphQLList(MountPoint) },
  }),
});

import {
  GraphQLList,
  GraphQLEnumType,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

// MountPropagation represents the propagation of a mount.
const MountPropagation = new GraphQLEnumType({
  name: 'MountPropagation',
  values: {
    RPRIVATE: { value: 'rprivate' },
    PRIVATE: { value: 'private' },
    RSHARED: { value: 'rshared' },
    SHARED: { value: 'shared' },
    RSLAVE: { value: 'rslave' },
    SLAVE: { value: 'slave' },
  },
});

const BindOptions = new GraphQLObjectType({
  name: 'BindOptions',
  description: 'Define options specific to mounts of type `bind`',
  fields: {
    Propagation: { type: MountPropagation },
  },
});

// VolumeOptions represents the options for a mount of type volume.
const VolumeOptions = new GraphQLObjectType({
  name: 'VolumeOptions',
  fields: {
    Populate: { type: GraphQLBoolean },
    //	Labels       map[string]string
//    DriverConfig: { type: Driver },
  },
});

const MountType = new GraphQLEnumType({
  name: 'MountType',
  values: {
    BIND: { value: 'bind' },
    VOLUME: { value: 'volume' },
  },
});

// Mount represents a mount (volume).
const Mount = new GraphQLObjectType({
  name: 'Mount',
  fields: {
    Type: { type: MountType },
    Source: { type: GraphQLString },
    Target: { type: GraphQLString },
    Writable: { type: GraphQLBoolean },
    BindOptions: { type: BindOptions },
    VolumeOptions: { type: VolumeOptions },
  },
});

// ContainerSpec represents the spec of a container.
export const ContainerSpec = new GraphQLObjectType({
  name: 'ContainerSpec',
  fields: {
    Image: { type: GraphQLString },
    //	Labels          map[string]string `json:",omitempty"`
    Command: { type: new GraphQLList(GraphQLString) },
    Args: { type: new GraphQLList(GraphQLString) },
    Env: { type: new GraphQLList(GraphQLString) },
    Dir: { type: GraphQLString },
    User: { type: GraphQLString },
    Mounts: { type: new GraphQLList(Mount) },
    StopGracePeriod: { type: GraphQLString }, //  *time.Duration
  },
});

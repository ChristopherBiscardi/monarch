import {
  GraphQLInt,
  GraphQLList,
  GraphQLBool,
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  MetaFields,
  Annotations,
} from '../common';

// ResolutionMode represents a resolution mode.
const ResolutionMode = new GraphQLEnumType({
  name: 'ResolutionMode',
  values: {
    VIP: { value: 'vip' },
    DNSRR: { value: 'dnsrr' },
  },
});

// PortConfigProtocol represents the protocol of a port.
const PortConfigProtocol = new GraphQLEnumType({
  name: 'PortConfigProtocol',
  values: {
    TCP: { value: 'tcp' },
    UDP: { value: 'udp' },
  },
});

const NetworkSpec = new GraphQLObjectType({
  name: 'NetworkSpec',
  fields: {
    ...Annotations,
    DriverConfiguration: { type: Driver },
    IPv6Enabled: { type: GraphQLBool },
    Internal: { type: GraphQLBool },
    IPAMOptions: { type: IPAMOptions },
  },
});

const Network = new GraphQLObjectType({
  name: 'Network',
  fields: {
    ID: { type: GraphQLString },
    ...MetaFields,
    Spec: { type: NetworkSpec },
    DriverState: { type: Driver },
    IPAMOptions: { type: IPAMOptions },
  },
});

export const NetworkAttachmentConfig = new GraphQLObjectType({
  name: 'NetworkAttachmentConfig',
  fields: {
    Target: { type: GraphQLString },
    Aliases: { type: new GraphQLList(GraphQLString) },
  },
});

// NetworkAttachment represents a network attchement.
export const NetworkAttachment = new GraphQLObjectType({
  name: 'NetworkAttachment',
  fields: {
    Network: { type: Network },
    Addresses: { type: new GraphQLList(GraphQLString) },
  },
});

// IPAMConfig represents ipam configuration.
const IPAMConfig = new GraphQLObjectType({
  name: 'IPAMConfig',
  fields: {
    Subnet: { type: GraphQLString },
    Range: { type: GraphQLString },
    Gateway: { type: GraphQLString },
  },
});

const IPAMOptions = new GraphQLObjectType({
  name: 'IPAMOptions',
  fields: {
    Driver: { type: Driver },
    Configs: { type: new GraphQLList(IPAMConfig) },
  },
});

// Driver represents a driver (network/volume).
const Driver = new GraphQLObjectType({
  name: 'Driver',
  fields: {
    Name: { type: GraphQLString },
    //	Options map[string]string  },
  },
});

export const PortConfig = new GraphQLObjectType({
  name: 'PortConfig',
  fields: {
    Name: { type: GraphQLString },
    Protocol: { type: PortConfigProtocol },
    TargetPort: { type: GraphQLInt },
    PublishedPort: { type: GraphQLInt },
  },
});

// EndpointVirtualIP represents the virtual ip of a port.
const EndpointVirtualIP = new GraphQLObjectType({
  name: 'EndpointVirtualIP',
  fields: {
    NetworkID: { type: GraphQLString },
    Addr: { type: GraphQLString },
  },
});

export const EndpointSpec = new GraphQLObjectType({
  name: 'EndpointSpec',
  fields: {
    Mode: { type: ResolutionMode },
    Ports: { type: new GraphQLList(PortConfig) },
  },
});

export const Endpoint = new GraphQLObjectType({
  name: 'Endpoint',
  fields: {
    Spec: { type: EndpointSpec },
    Ports: { type: new GraphQLList(PortConfig) },
    VirtualIPs: { type: new GraphQLList(EndpointVirtualIP) },
  },
});

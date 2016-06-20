import {
  GraphQLInt,
  GraphQLList,
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { MetaFields } from './common';
import { NetworkAttachment } from './swarm/network';
import {
  ContainerSpec,
} from './swarm/Container';

const TaskState = new GraphQLEnumType({
  name: 'TaskState',
  values: {
    NEW: { value: 'new' },
    ALLOCATED: { value: 'allocated' },
    PENDING: { value: 'pending' },
    ASSIGNED: { value: 'assigned' },
    ACCEPTED: { value: 'accepted' },
    PREPARING: { value: 'preparing' },
    READY: { value: 'ready' },
    STARTING: { value: 'starting' },
    RUNNING: { value: 'running' },
    COMPLETE: { value: 'complete' },
    SHUTDOWN: { value: 'shutdown' },
    FAILED: { value: 'failed' },
    REJECTED: { value: 'rejected' },
  },
});

const Task = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    ID: { type: GraphQLString },
    ...MetaFields,
    Spec: { type: TaskSpec },
    ServiceID: { type: GraphQLString },
    Slot: { type: GraphQLInt },
    NodeID: { type: GraphQLString },
    Status: { type: TaskStatus },
    DesiredState: { type: TaskState },
    NetworksAttachments: new GraphQLList(NetworkAttachment),
  }),
});

const Placement = new GraphQLObjectType({
  name: 'Placement',
  description: 'Placement represents orchestration parameters',
  fields: {
    Constraints: { type: new GraphQLList(GraphQLString) },
  },
});

export const TaskSpec = new GraphQLObjectType({
  name: 'TaskSpec',
  fields: () => ({
    ContainerSpec: { type: ContainerSpec },
    Resources: { type: ResourceRequirements },
    RestartPolicy: { type: RestartPolicy },
    Placement: { type: Placement },
  }),
});

const Resources = new GraphQLObjectType({
  name: 'Resources',
  fields: () => ({
    NanoCPUs: { type: GraphQLInt },
    MemoryBytes: { type: GraphQLInt },
  }),
});

// ResourceRequirements represents resources requirements.
const ResourceRequirements = new GraphQLObjectType({
  name: 'ResourceRequirements',
  fields: () => ({
    Limits: { type: Resources },
    Reservations: { type: Resources },
  }),
});

const RestartPolicy = new GraphQLObjectType({
  name: 'RestartPolicy',
  fields: () => ({
    Condition: { type: RestartPolicyCondition },
    Delay: { type: GraphQLString }, // time.Duration
    MaxAttempts: { type: GraphQLInt },
    Window: { type: GraphQLString }, // time.Duration
  }),
});

const RestartPolicyCondition = new GraphQLEnumType({
  name: 'RestartPolicyCondition',
  values: {
    NONE: { value: 'none' },
    ON_FAILURE: { value: 'on_failure' },
    ANY: { value: 'any' },
  },
});

const TaskStatus = new GraphQLObjectType({
  name: 'TaskStatus',
  fields: {
    Timestamp: { type: GraphQLString }, // time.Time
    State: { type: TaskState },
    Message: { type: GraphQLString },
    Err: { type: GraphQLString },
    ContainerStatus: { type: ContainerStatus },
  },
});

const ContainerStatus = new GraphQLObjectType({
  name: 'ContainerStatus',
  fields: {
    ContainerID: { type: GraphQLString },
    PID: { type: GraphQLInt },
    ExitCode: { type: GraphQLInt },
  },
});

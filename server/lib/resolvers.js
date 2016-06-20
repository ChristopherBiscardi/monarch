import {
  fromGlobalId,
  nodeDefinitions,
} from 'graphql-relay';

import inspectContainer from './containers/inspect';
import {
  ContainerJSONBase,
  ContainerJSONBaseType,
} from './types/Containers';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      case 'ContainerJSONBase':
        return inspectContainer(id);
      case 'Service':
        return () => {
          console.log('assaasass');
        }
      default:
        return null;
    }
  },
  obj => {
    if (obj instanceof ContainerJSONBase) {
      return ContainerJSONBaseType;
    } else if (obj instanceof Service) {
      return ServiceType;
    }
    return null;
  }
);
export {
  nodeInterface,
  nodeField,
};

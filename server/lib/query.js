import { ContainerJSONBase, ContainersType } from './types/Containers';
import graphql, {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull
} from 'graphql';
import Docker from 'dockerode';
const docker = new Docker();

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    containerInspect: {
      type: ContainerJSONBase,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (_, args) => new Promise((resolve, reject) => {
        docker.getContainer(args.id)
              .inspect((err, data) => {
                if(err) {
                  console.log('containerInspect: ', err);
                  reject(err);
                }
                resolve(data);
              })
      })
    },
    containerList: {
      type: new GraphQLList(ContainersType),
      resolve: (_, args) => new Promise((resolve, reject) => {
        let opts = {};
        docker.listContainers(opts, (err, data) => {
          if(err) {
            console.log('containerInspect: ', err);
            reject(err);
          }
          resolve(data);
        })
      })
    }
  }
})

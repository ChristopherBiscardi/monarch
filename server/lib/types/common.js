import {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

const Version = new GraphQLObjectType({
  name: 'Version',
  fields: {
    Index: { type: GraphQLInt }
  }
})

export const MetaFields = {
  Version: { type: Version },
  CreatedAt: { type: GraphQLString },
  UpdatedAt: { type: GraphQLString },
};

export const Annotations = {
  Name: { type: GraphQLString },
  // Labels: { type: GraphQLMap }
};

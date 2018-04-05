const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { node, nodes } = require('./Node');
const { me, users } = require('./User');

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            node,
            nodes,
            me,
            users,
        },
    }),
});

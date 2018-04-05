const { nodeDefinitions, fromGlobalId } = require('graphql-relay');
const { assignTypeFn, getGraphQLType } = require('../utils');

const { nodeInterface, nodeField: node, nodesField: nodes } = nodeDefinitions(
    (globalId, context) => {
        const { type, id } = fromGlobalId(globalId);

        switch (type) {
            case 'User':
                return context.loadUserById.load(id).then(assignTypeFn('User'));
            default:
                return null;
        }
    },
    (obj) => {
        const type = getGraphQLType(obj);
        switch (type) {
            case 'User':
                return require('./UserType').default;
            default:
                return null;
        }
    }
);

module.exports = {
    nodeInterface,
    node,
    nodes,
};

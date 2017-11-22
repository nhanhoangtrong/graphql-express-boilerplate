import { nodeDefinitions, fromGlobalId } from 'graphql-relay';
import { assignTypeFn, getGraphQLType } from '../utils';

const { nodeInterface, nodeField: node, nodesField: nodes } = nodeDefinitions((globalId, context) => {
    const { type, id } = fromGlobalId(globalId);

    switch (type) {
        case 'User':
            return context.loadUserById.load(id).then(assignTypeFn('User'));
        default:
            return null;
    }
}, obj => {
    const type = getGraphQLType(obj);
    switch (type) {
        case 'User':
            return require('./UserType').default;
        default:
            return null;
    }
});

export {
    nodeInterface,
    node,
    nodes
};

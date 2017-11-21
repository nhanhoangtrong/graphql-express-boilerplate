import { nodeDefinitions, fromGlobalId } from 'graphql-relay';
import { User } from '../../auth/models';

const { nodeInterface, nodeField: node, nodesField: nodes } = nodeDefinitions((globalId) => {
    const { type, id } = fromGlobalId(globalId);

    switch (type) {
        case 'User':
            return User.byId(id).then(user => {
                if (user) {
                    user.__type = 'User';
                    return user;
                }
                return null;
            });
        default:
            return null;
    }
}, obj => {
    const type = obj ? obj.__type : undefined;
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

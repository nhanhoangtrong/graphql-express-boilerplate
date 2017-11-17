import { buildSchema } from 'graphql';

export const schema = buildSchema(`
type Query {
    hello: String!
}
`);

export const rootResolver = {
    hello: (args, ctx) => {
        ctx.isAuthenticated();
        return `Hello, ${ctx.user.name}`;
    },
};

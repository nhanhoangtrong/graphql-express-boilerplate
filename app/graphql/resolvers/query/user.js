module.exports = {
    me(root, args, { user, loadUserById }) {
        return loadUserById.load(user.id);
    },
    users(root, args, ctx) {
        return ctx.loadAllUsers();
    },
};

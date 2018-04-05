/**
 * Return the type of an GraphQL object
 *
 * @param {Object} obj
 * @returns {string | null | undefined}
 */
exports.getGraphQLType = function getGraphQLType(obj) {
    return obj ? obj.__type : undefined;
};

/**
 * Return a function that can assign a given type to an GraphQL object
 *
 * @param {string} type
 * @returns {Function}
 */
exports.assignTypeFn = function assignTypeFn(type) {
    return (obj) => {
        if (obj) obj.__type = type;
        return obj;
    };
};

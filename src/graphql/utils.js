/**
 * Utility function that get two arguments: a list of keys and
 * a function that computed id, then return a function that
 * resolve the rows based on keys and computed id need for batching cache
 *
 * @param {Array} keys - List of keys for mapping to resolving values
 * @param {Function} idFunction - Get the current row, return the unique id of row
 */
export function mapTo(keys, idFunction) {
    return rows => {
        const resolvedMap = new Map(keys.map(key => [key, null]));
        rows.forEach(row => resolvedMap.set(idFunction(row), row));
        return Array.from(resolvedMap.values());
    };
}

/**
 * Return the type of an GraphQL object
 *
 * @param {Object} obj
 * @returns {string | null | undefined}
 */
export function getGraphQLType(obj) {
    return obj ? obj.__type : undefined;
}

/**
 * Return a function that can assign a given type to an GraphQL object
 *
 * @param {string} type
 * @returns {Function}
 */
export function assignTypeFn(type) {
    return obj => {
        if (obj) obj.__type = type;
        return obj;
    };
}

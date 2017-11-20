
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', table => {
            table.uuid('id').notNullable().defaultTo(knex.raw('uuid_generate_v1mc()')).primary();
            table.string('first_name', 100);
            table.string('last_name', 100);
            table.string('email').notNullable();
            table.string('password_salt').notNullable();
            table.string('password_hash').notNullable();
            table.boolean('is_verified').defaultTo(false);
            table.boolean('is_admin').defaultTo(false);
            table.timestamps(false, true);
            table.unique(['id', 'email']);
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('users'),
    ]);
};

exports.config = {
    transaction: true,
};

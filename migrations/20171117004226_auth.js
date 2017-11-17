
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', table => {
            table.uuid('id').notNullable().defaultTo(knex.raw('uuid_generate_v1mc()')).primary();
            table.string('name', 100);
            table.string('email');
            table.string('password_hash', 128);
            table.timestamps(false, true);
        }),
        knex.schema.createTable('auths', table => {
            table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
            table.string('provider').notNullable();
            table.string('id', 36).notNullable();
            table.string('username', 100);
            table.jsonb('tokens').notNullable();
            table.jsonb('profile').notNullable();
            table.timestamps(false, true);
            table.primary(['provider', 'id']);
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('auths'),
        knex.schema.dropTableIfExists('users'),
    ]);
};

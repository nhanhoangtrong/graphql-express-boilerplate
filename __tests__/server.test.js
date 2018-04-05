const request = require('supertest');
const { consoleTransport } = require('../utils/logger');
const app = require('../app');

// Disable info logger when testing
consoleTransport.level = 'warning';

describe('Testing the basic server', () => {
    test('Should be request the GraphQL schema from server as a text file', async () => {
        const res = await request(app).get('/graphql/schema');
        expect(res.status).toBe(200);
    });

    test('Should a greeting string', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toEqual('Hello World!');
    });
});

import request from 'supertest';
import { consoleTransport } from '../src/logger';
import '../src/index';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import app from '../src/app';

// Disable info logger when testing
consoleTransport.level = 'warning';

describe('Testing the basic server', () => {
    test('Should be request the GraphQL schema from server as a text file', async () => {
        const res = await request(app).get('/graphql/schema');
        expect(res.status).toBe(200);
    });

    test('Should serve a text file in /static folder', async () => {
        const data = readFileSync(resolve(__dirname, '../static/text.txt'));
        const res = await request(app)
            .get('/static/text.txt');
        expect(res.status).toBe(200);
        expect(res.text).toEqual(data.toString());
    });
});

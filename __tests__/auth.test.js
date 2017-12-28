import request from 'supertest';
import app from '../src/app';
import { consoleTransport } from '../src/utils/logger';

// Disable info logger when testing
consoleTransport.level = 'warning';

describe('Testing /auth route', () => {
    test('Should received a bad request when loggin', async () => {
        try {
            await request(app).post('/auth/login', {
                email: 'tester@localhost',
                password: 'password2',
            });
        } catch (err) {
            expect(err.status).toBe(400);
        }

    });
});

import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { consoleTransport } from '../src/logger';

chai.should();
chai.use(chaiHttp);

// Disable info logger when testing
consoleTransport.level = 'warning';

describe('Testing /auth route', () => {
    it('Should received a bad request when loggin', async () => {
        try {
            await chai.request(app).post('/auth/login', {
                email: 'tester@localhost',
                password: 'password2',
            });
        } catch (err) {
            err.response.should.have.status(400);
        }

    });
});

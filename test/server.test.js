import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { consoleTransport } from '../src/logger';
import '../src/index';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Disable info logger when testing
consoleTransport.level = 'warning';

chai.should();
chai.use(chaiHttp);

describe('Testing the basic server', () => {
    it('Should be request the GraphQL schema from server as a text file', async () => {
        const res = await chai.request('http://localhost:3000').get('/graphql/schema');
        res.should.have.status(200);
    });

    it('Should serve a text file in /static folder', async () => {
        const data = readFileSync(resolve(__dirname, '../static/text.txt'));
        const res = await chai.request('http://localhost:3000')
            .get('/static/text.txt');
        res.should.have.status(200);
        res.text.should.equal(data.toString());
    });
});

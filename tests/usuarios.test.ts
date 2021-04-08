const request = require('supertest');

import { router as app } from '../routes/router';

describe("Test GET endpoints", () => {
    it("Lista de todos los usuarios", done => {
        request.agent(app)
            .get('/usuarios')
            .set('Accept', 'application/json')
            .expect(200, done);
    });
});
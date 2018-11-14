import expect from 'expect';
import request from 'supertest';
import app from '../app';

describe('POST /login', () => {
  it('should authenticate the armourer with valid details', () => request(app)
    .post('/api/v1/auth/login')
    .send({
      username: 'armourer_jones',
      password: 'armourer20',
    })
    .set('Accept', 'application/json')
    .expect(303)
    .then((response) => {
      expect(response.body.message).toContain('successfully logged');
      expect(response.body.token).toBeTruthy();
    }));

  it('should not authenticate user with invalid username', () => request(app)
    .post('/api/v1/auth/login')
    .send({
      username: 'st',
      password: 'anypass',
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.userId).toBeFalsy();
      expect(response.body.error).toContain('Invalid');
    }));

  it('should not authenticate user with invalid password', () => request(app)
    .post('/api/v1/auth/login')
    .send({
      username: 'st_dbt',
      password: 'ti',
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.userId).toBeFalsy();
      expect(response.body.error).toContain('Invalid');
    }));


  it('should not authenticate user with wrong username or password', () => request(app)
    .post('/api/v1/auth/login')
    .send({
      username: 'wrong_username',
      password: 'wrong_password',
    })
    .set('Accept', 'application/json')
    .expect(403)
    .then((response) => {
      expect(response.body.userId).toBeFalsy();
      expect(response.body.error).toContain('Invalid');
    }));
});

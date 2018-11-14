import expect from 'expect';
import request from 'supertest';
import app from '../app';

const integerError = 'must be a positive integer';
describe('POST /events', () => {
  it('should return userId error with empty body request', () => request(app)
    .post('/api/v1/events')
    .send({
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('userId');
      expect(response.body.error).toContain(integerError);
    }));
  it('should return userId error with non-integer userId', () => request(app)
    .post('/api/v1/events')
    .send({
      userId: 'gh',
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('userId');
      expect(response.body.error).toContain(integerError);
    }));

  it('should return rankId error with non-integer rankId', () => request(app)
    .post('/api/v1/events')
    .send({
      userId: '18',
      rankId: 'li',
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('rankId');
      expect(response.body.error).toContain(integerError);
    }));

  it('should return gunId error with non-integer gunId', () => request(app)
    .post('/api/v1/events')
    .send({
      userId: '18',
      rankId: '10',
      gunId: 'it',
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('gunId');
      expect(response.body.error).toContain(integerError);
    }));

  it('should return timestamp error with non-integer timestamp', () => request(app)
    .post('/api/v1/events')
    .send({
      userId: '18',
      rankId: '10',
      gunId: '2',
      timestamp: 'none',
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('timestamp');
      expect(response.body.error).toContain(integerError);
    }));

  it('should return action error with non-integer action', () => request(app)
    .post('/api/v1/events')
    .send({
      userId: '18',
      rankId: '10',
      gunId: '2',
      timestamp: '161234567',
    })
    .set('Accept', 'application/json')
    .expect(400)
    .then((response) => {
      expect(response.body.error).toContain('action');
      expect(response.body.error).toContain(integerError);
    }));

  it('should add a new event with valid input', () => request(app)
    .post('/api/v1/events')
    .send({
      userId: '18',
      rankId: '10',
      gunId: '2',
      timestamp: '161234567',
      action: 31,
    })
    .set('Accept', 'application/json')
    .expect(201)
    .then((response) => {
      expect(response.body.message).toContain('success');
      expect(response.body.message).toContain('161234567');
    }));
});

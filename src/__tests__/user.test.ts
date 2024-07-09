import supertest from "supertest";
import createServer from "../utils/server";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";

const app = createServer();

describe('user', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    const dbUri = mongoServer.getUri();

    await mongoose.connect(dbUri);
  });

  describe('signup and login', () => {
    it('should fail when passwords do not match', async () => {
      const { statusCode, body } = await supertest(app).post('/api/users').send({
        "username": "testuser1",
        "password": "123456789",
        "passwordConfirm": "1234567890",
        "email": "testuser1@example.com"
      });

      expect(statusCode).toBe(400);
      expect(body[0].message).toBe('Passwords do not match');
    });

    it('should create an account', async () => {
      const { statusCode } = await supertest(app).post('/api/users').send({
        "username": "testuser1",
        "password": "123456789",
        "passwordConfirm": "123456789",
        "email": "testuser1@example.com"
      });

      expect(statusCode).toBe(200);
    });

    it('should fail when signing up with duplicate email', async () => {
      const { statusCode } = await supertest(app).post('/api/users').send({
        "username": "testuser56",
        "password": "123456789",
        "passwordConfirm": "123456789",
        "email": "testuser1@example.com"
      });

      expect(statusCode).toBe(409);
    });

    it('should fail when trying to login with nonexisting account', async () => {
      const { statusCode } = await supertest(app).post('/login').send({
        "email": "testuser2@example.com",
        "password": "123456789"
      });

      expect(statusCode).toBe(401);
    });

    it('should login', async () => {
      const { statusCode } = await supertest(app).post('/login').send({
        "email": "testuser1@example.com",
        "password": "123456789"
      });

      expect(statusCode).toBe(200);
    });
  })

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
});

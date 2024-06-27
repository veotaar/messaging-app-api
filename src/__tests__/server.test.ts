import supertest from "supertest";
import createServer from "../utils/server";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";

const app = createServer();

describe('server', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    const dbUri = mongoServer.getUri();

    await mongoose.connect(dbUri);
  });

  describe('healthcheck', () => {
    it('should return 200', async () => {
      const { statusCode } = await supertest(app).get('/healthcheck');

      expect(statusCode).toBe(200);
    })
  })

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
});

import supertest from "supertest";
import useServer from "../utils/server";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";
import { afterAll, beforeAll, describe, expect, it } from 'bun:test';

const { server: app } = useServer();
let mongoServer: MongoMemoryServer;

describe('server', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const dbUri = mongoServer.getUri();

    await mongoose.connect(dbUri);
  });

  describe('healthcheck', () => {
    it('should return 200', async () => {
      const { statusCode } = await supertest(app).get('/api/healthcheck');

      expect(statusCode).toBe(200);
    })
  })

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    await mongoServer.stop();
  });
});

import supertest from "supertest";
import createServer from "../utils/server";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";
import { findUser } from "../services/user.service";

const app = createServer();

const userOnePayload = {
  "username": "user1",
  "password": "123456789",
  "passwordConfirm": "123456789",
  "email": "user1@asd.com"
};

const userTwoPayload = {
  "username": "user2",
  "password": "123456789",
  "passwordConfirm": "123456789",
  "email": "user2@asd.com"
};

describe('friend requests', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    const dbUri = mongoServer.getUri();

    await mongoose.connect(dbUri);
  });

  describe('adding friends', () => {
    it('should add friend', async () => {
      const { statusCode, body } = await supertest(app).post('/api/users').send(userOnePayload);
      const userOneToken = body.jwt.token as string;
      const userOneId = body.user._id as string;

      const { body: userTwoBody } = await supertest(app).post('/api/users').send(userTwoPayload);
      const userTwoId = userTwoBody.user._id as string;
      const userTwoToken = userTwoBody.jwt.token as string;

      const { statusCode: friendReqStatusCode, body: friendRequestBody } = await supertest(app).post('/api/friend-requests').set('Authorization', userOneToken).send({
        "to": userTwoId
      });

      const { statusCode: requestResultStatusCode, body: requestResultBody } = await supertest(app).put(`/api/friend-requests/${friendRequestBody.friendRequest._id as string}/accept`)
        .set('Authorization', userTwoToken);

      const userOne = await findUser(userOneId);

      console.log(userOne);

      expect(statusCode).toBe(200);
      expect(friendReqStatusCode).toBe(200);
      expect(requestResultStatusCode).toBe(200);
    });
  })

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
});

import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../..";
import connectDatabase from "../../../database/connectDatabase";
import User from "../../../database/models/userSchema";
let mongodbServer: MongoMemoryServer;

beforeAll(async () => {
  mongodbServer = await MongoMemoryServer.create();
  const mongodbServerUrl = mongodbServer.getUri();

  await connectDatabase(mongodbServerUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongodbServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a dronesRouter", () => {
  const dronesEndpoint = "/drones/";

  describe("When it receives a get request at the endpoint '/drones'", () => {
    test("Then it should respond with a property drones", async () => {
      const response = await request(app).get(dronesEndpoint);

      expect(response.body).toHaveProperty("drones");
    });

    test("Then it should respond with a status 200 response", async () => {
      const expectedStatusResponse = 200;

      await request(app).get(dronesEndpoint).expect(expectedStatusResponse);
    });
  });
});

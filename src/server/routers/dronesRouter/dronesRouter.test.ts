import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../..";
import connectDatabase from "../../../database/connectDatabase";
import { Drone } from "../../../database/models/droneSchema";
import User from "../../../database/models/userSchema";
import { mockDrones } from "../../../mocks/mocks";
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
  const getDronesEndpoint = "/drones/";

  describe("When it receives a get request at the endpoint '/drones'", () => {
    beforeAll(async () => {
      await Drone.insertMany(mockDrones);
    });

    test("Then it should respond with a property drones", async () => {
      const response = await request(app).get(getDronesEndpoint);

      expect(response.body).toHaveProperty("drones");
    });

    test("Then it should respond with a status 200 response", async () => {
      const expectedStatusResponse = 200;

      await request(app).get(getDronesEndpoint).expect(expectedStatusResponse);
    });
  });
});

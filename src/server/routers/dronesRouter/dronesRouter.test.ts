/* eslint-disable max-nested-callbacks */
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import app from "../..";
import connectDatabase from "../../../database/connectDatabase";
import { type CustomRequestCreateDrone } from "../../../types";
import { mockDroneCreate } from "../../../mocks/mocks";
import { Drone } from "../../../database/models/droneSchema";

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
  await Drone.deleteMany();
});

afterEach(() => jest.clearAllMocks());

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

describe("Given a post at drones/create endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with the status code 201", async () => {
      const createUrl = "/drones/create-drone";
      const expectedCode = 400;

      const creator = new mongoose.Types.ObjectId();
      jwt.verify = jest.fn().mockReturnValue({ sub: creator });
      jest.mock("sharp", () => ({
        __esModule: true,
        default: jest.fn(() => ({
          resize: jest.fn(() => ({
            webp: jest.fn(() => ({
              toBuffer: jest.fn(() => "optimizedImageBuffer"),
            })),
          })),
        })),
      }));
      const response: { body: { drone: CustomRequestCreateDrone } } =
        await request(app)
          .post(createUrl)
          .set(
            "Authorization",
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDA3MjllMjMwNGM4NzI4ZGEwYTY3OWEiLCJlbWFpbCI6Im1hcmNlbG1hcnRpbm8yMDUzQGdtYWlsLmNvbSIsImlhdCI6MTY3ODg5MTE3MX0.v94vA41n7CbL13fMk1AT2ebpD6g3cxkMEJu3zxnTAsc"
          )
          .set("content-type", "multipart/form-data")
          .attach("droneImage", Buffer.from("droneimages"), {
            filename: "drone-image.png",
          })
          .attach("schemaImage", Buffer.from("droneimages"), {
            filename: "schema-image.png",
          })
          .field("creator", mockDroneCreate.creator)
          .field("difficulty", mockDroneCreate.difficulty)
          .field("transmissionType", mockDroneCreate.transmissionType)
          .field("droneClass", mockDroneCreate.droneClass)
          .field("motorName", mockDroneCreate.motorName)
          .field(
            "motorPricePerUnit",
            mockDroneCreate.motorPricePerUnit.toString()
          )
          .field("motorQuantity", mockDroneCreate.motorQuantity.toString())
          .attach("motorImage", Buffer.from("droneimages"), {
            filename: "motor-image.png",
          })
          .field("frameName", mockDroneCreate.frameName)
          .field(
            "frameSizeOrMountingSize",
            mockDroneCreate.frameSizeOrMountingSize
          )
          .field(
            "framePricePerUnit",
            mockDroneCreate.framePricePerUnit.toString()
          )
          .attach("frameImage", Buffer.from("droneimages"), {
            filename: "frame-image.png",
          })
          .field("escName", mockDroneCreate.escName)
          .field("escPricePerUnit", mockDroneCreate.escPricePerUnit.toString())
          .field("escQuantity", mockDroneCreate.escQuantity.toString())
          .attach("escImage", Buffer.from("droneimages"), {
            filename: "esc-image.png",
          })
          .field("cameraName", mockDroneCreate.cameraName)
          .field(
            "cameraPricePerUnit",
            mockDroneCreate.cameraPricePerUnit.toString()
          )
          .field(
            "cameraSizeOrMountingSize",
            mockDroneCreate.cameraSizeOrMountingSize
          )
          .attach("cameraImage", Buffer.from("droneImages"), {
            filename: "camera-image.png",
          })
          .field("vtxName", mockDroneCreate.vtxName)
          .field("vtxPricePerUnit", mockDroneCreate.vtxPricePerUnit)
          .field("vtxConnector", mockDroneCreate.vtxConnector)
          .field("vtxPower", mockDroneCreate.vtxPower)
          .attach("vtxImage", Buffer.from("droneImages"), {
            filename: "vtx-image.png",
          })
          .field("propellerName", mockDroneCreate.propellerName)
          .field(
            "propellerPricePerUnit",
            mockDroneCreate.propellerPricePerUnit.toString()
          )
          .field(
            "propellerSizeOrMountingSize",
            mockDroneCreate.propellerSizeOrMountingSize
          )
          .field("propellerQuantity", mockDroneCreate.propellerQuantity)
          .attach("propellerImage", Buffer.from("droneImages"), {
            filename: "propeller-image.png",
          })
          .field("controllerName", mockDroneCreate.controllerName)
          .field(
            "controllerPricePerUnit",
            mockDroneCreate.controllerPricePerUnit.toString()
          )
          .field("controllerType", mockDroneCreate.controllerType)
          .attach("controllerImage", Buffer.from("droneImages"), {
            filename: "controller.png",
          })

          .field("batteryName", mockDroneCreate.batteryName)
          .field(
            "batteryPricePerUnit",
            mockDroneCreate.batteryPricePerUnit.toString()
          )
          .field("batteryVoltage", mockDroneCreate.batteryVoltage)
          .field("batteryCapacity", mockDroneCreate.batteryCapacity)
          .attach("batteryImage", Buffer.from("droneImages"), {
            filename: "battery.png",
          })

          .field("vtxAntennaName", mockDroneCreate.vtxAntennaName)
          .field(
            "vtxAntennaPricePerUnit",
            mockDroneCreate.vtxAntennaPricePerUnit.toString()
          )
          .field("vtxAntennaConnector", mockDroneCreate.vtxAntennaConnector)
          .attach("vtxAntennaImage", Buffer.from("droneImages"), {
            filename: "vtx_antenna.png",
          })

          .field("receiverName", mockDroneCreate.receiverName)
          .field(
            "receiverPricePerUnit",
            mockDroneCreate.receiverPricePerUnit.toString()
          )
          .field("receiverProtocol", mockDroneCreate.receiverProtocol)
          .field("receiverTelemetry", mockDroneCreate.receiverTelemetry)
          .attach("receiverImage", Buffer.from("droneImages"), {
            filename: "receiver.png",
          })

          .expect(expectedCode);
    });
  });
});

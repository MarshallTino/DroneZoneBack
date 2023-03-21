import { type Request } from "express";

import type * as core from "express-serve-static-core";
export interface CustomRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any
> extends Request<P, ResBody, ReqBody> {
  creator?: string;
}

export interface DroneComponent {
  name: string;
  pricePerUnit: number;
  image: string;
  quantity?: number;
  sizeOrmountingSize?: string;
  connector?: string;
  power?: string;
  type?: string;
  batteryVoltage?: string;
  batteryCapacity?: string;
  protocol?: string;
  telemetry?: string;
}

export interface DroneStructureCreate {
  droneImage: string;
  schemaImage: string;
  creator: string;
  categories: {
    difficulty: string;
    transmissionType: string;
    droneClass: string;
  };
  components: {
    motor: DroneComponent;
    frame: DroneComponent;
    esc: DroneComponent;
    camera: DroneComponent;
    vtx: DroneComponent;
    propeller: DroneComponent;
    controller: DroneComponent;
    battery: DroneComponent;
    vtxAntenna: DroneComponent;
    receiver: DroneComponent;
  };
}

export interface CustomRequestCreateDrone extends CustomRequest {
  body: {
    droneImage: string;
    schemaImage: string;
    creator: string;
    difficulty: string;
    transmissionType: string;
    droneClass: string;
    motorName: string;
    motorPricePerUnit: number;
    motorQuantity: number;
    motorImage: string;
    frameName: string;
    frameSizeOrMountingSize: string;
    framePricePerUnit: number;
    frameImage: string;
    escName: string;
    escPricePerUnit: number;
    escQuantity: number;
    escImage: string;
    cameraName: string;
    cameraPricePerUnit: number;
    cameraSizeOrMountingSize: string;
    cameraImage: string;
    vtxName: string;
    vtxPricePerUnit: number;
    vtxConnector: string;
    vtxPower: string;
    vtxImage: string;
    propellerName: string;
    propellerPricePerUnit: number;
    propellerSizeOrMountingSize: string;
    propellerQuantity: number;
    propellerImage: string;
    controllerName: string;
    controllerPricePerUnit: number;
    controllerType: string;
    controllerImage: string;
    batteryName: string;
    batteryPricePerUnit: number;
    batteryVoltage: string;
    batteryCapacity: string;
    batteryImage: string;
    vtxAntennaName: string;
    vtxAntennaPricePerUnit: number;
    vtxAntennaConnector: string;
    vtxAntennaImage: string;
    receiverName: string;
    receiverPricePerUnit: number;
    receiverProtocol: string;
    receiverTelemetry: string;
    receiverImage: string;
  };
  files: [
    droneImage: Express.Multer.File,
    schemaImage: Express.Multer.File,
    motorImage: Express.Multer.File,
    frameImage: Express.Multer.File,
    escImage: Express.Multer.File,
    cameraImage: Express.Multer.File,
    vtxImage: Express.Multer.File,
    propellerImage: Express.Multer.File,
    controllerImage: Express.Multer.File,
    batteryImage: Express.Multer.File,
    vtxAntennaImage: Express.Multer.File,
    receiverImage: Express.Multer.File
  ];
}

export interface CreateDroneSharp extends CustomRequest {
  files: Express.Multer.File[];
}
export interface DroneStructure extends DroneStructureCreate {
  id: string;
}

export interface CreatorRequest extends CustomRequest {
  creator: string;
}

export type DroneImages = Record<string, string>;

export interface UploadedFile {
  publicUrl: string;
}

import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../customError/CustomError.js";
import { Drone } from "../../../database/models/droneSchema.js";
import {
  type CustomRequestCreateDrone,
  type DroneStructureCreate,
  type CreatorRequest,
} from "../../../types.js";

export const getDrones = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const drones = await Drone.find().exec();

    res.status(200).json({ drones });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Internal server error"
    );
    next(customError);
  }
};

export const getUserDrones = async (
  req: CreatorRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDrones = await Drone.find({ creator: req.creator }).exec();

    res.status(200).json({ userDrones });
  } catch (error) {
    const customError = new CustomError(
      "Bad request",
      400,
      "Couldn't retrieve user's Drones"
    );

    next(customError);
  }
};

export const deleteDrone = async (
  req: CreatorRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { droneId } = req.params;
    const drone = await Drone.findByIdAndDelete({
      _id: droneId,
      creator: req.creator,
    }).exec();

    res.status(200).json({ drone });
  } catch (error) {
    const customError = new CustomError(
      "Server Error. Something went wrong.",
      500,
      "The drone could't be deleted"
    );

    next(customError);
  }
};

export const createDrone = async (
  req: CustomRequestCreateDrone,
  res: Response,
  next: NextFunction
) => {
  const requestBody = req.body;
  try {
    const droneData: DroneStructureCreate = {
      droneImage: requestBody.droneImage,
      schemaImage: requestBody.schemaImage,
      creator: req.creator!,
      categories: {
        difficulty: requestBody.difficulty,
        droneClass: requestBody.droneClass,
        transmissionType: requestBody.transmissionType,
      },
      components: {
        motor: {
          name: requestBody.motorName,
          image: requestBody.motorImage,
          pricePerUnit: requestBody.motorPricePerUnit,
          quantity: requestBody.motorQuantity,
        },
        frame: {
          name: requestBody.frameName,
          image: requestBody.frameImage,
          pricePerUnit: requestBody.framePricePerUnit,
          sizeOrmountingSize: requestBody.frameSizeOrMountingSize,
        },
        esc: {
          name: requestBody.escName,
          image: requestBody.escImage,
          quantity: requestBody.escQuantity,
          pricePerUnit: requestBody.escPricePerUnit,
        },
        camera: {
          name: requestBody.cameraName,
          image: requestBody.cameraImage,
          sizeOrmountingSize: requestBody.cameraSizeOrMountingSize,
          pricePerUnit: requestBody.cameraPricePerUnit,
        },
        vtx: {
          name: requestBody.vtxName,
          image: requestBody.vtxImage,
          pricePerUnit: requestBody.vtxPricePerUnit,
          connector: requestBody.vtxConnector,
          power: requestBody.vtxPower,
        },
        propeller: {
          name: requestBody.propellerName,
          image: requestBody.propellerImage,
          pricePerUnit: requestBody.propellerPricePerUnit,
          quantity: requestBody.propellerQuantity,
        },
        controller: {
          name: requestBody.controllerName,
          image: requestBody.controllerImage,
          pricePerUnit: requestBody.controllerPricePerUnit,
          type: requestBody.controllerType,
        },
        battery: {
          name: requestBody.batteryName,
          image: requestBody.batteryImage,
          batteryCapacity: requestBody.batteryCapacity,
          batteryVoltage: requestBody.batteryVoltage,
          pricePerUnit: requestBody.batteryPricePerUnit,
        },
        vtxAntenna: {
          name: requestBody.vtxAntennaName,
          image: requestBody.vtxAntennaImage,
          pricePerUnit: requestBody.vtxAntennaPricePerUnit,
          connector: requestBody.vtxAntennaConnector,
        },
        receiver: {
          name: requestBody.receiverName,
          image: requestBody.receiverImage,
          pricePerUnit: requestBody.receiverPricePerUnit,
          telemetry: requestBody.receiverTelemetry,
          protocol: requestBody.receiverProtocol,
        },
      },
    };
    const drone = await Drone.create(droneData);

    res.status(201).json({ drone });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      409,
      "Couldn't create the drone"
    );
    next(customError);
  }
};

export const getDroneById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { droneId } = req.params;
    const drone = await Drone.findById(droneId).exec();

    if (!drone) {
      const customError = new CustomError(
        "Drone not found",
        400,
        "Drone not found"
      );

      next(customError);

      return;
    }

    res.status(200).json({ drone });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      400,
      "Something went wrong"
    );

    next(customError);
  }
};

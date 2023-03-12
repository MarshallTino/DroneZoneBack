import { model, Schema } from "mongoose";
import DroneComponentSchema from "./droneComponentSchema.js";

const DroneSchema = new Schema({
  droneImage: { type: String, required: true },
  schemaImage: { type: String, required: true },
  creator: { type: String, required: true },
  categories: {
    difficulty: { type: String, required: true },
    transmissionType: { type: String, required: true },
    droneClass: { type: String, required: true },
  },
  components: {
    motor: DroneComponentSchema,
    frame: DroneComponentSchema,
    esc: DroneComponentSchema,
    camera: DroneComponentSchema,
    vtx: DroneComponentSchema,
    propeller: DroneComponentSchema,
    controller: DroneComponentSchema,
    battery: DroneComponentSchema,
    vtxAntenna: DroneComponentSchema,
    receiver: DroneComponentSchema,
  },
});

export const Drone = model("Drone", DroneSchema, "drones");

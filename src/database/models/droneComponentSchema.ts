import { Schema } from "mongoose";
const DroneComponentSchema = new Schema({
  name: { type: String, required: true },
  pricePerUnit: { type: Number, required: true },
  quantity: { type: Number },
  image: { type: String, required: true },
  sizeOrmountingSize: { type: String },
  connector: { type: String },
  power: { type: String },
  type: { type: String },
  batteryVoltage: { type: String },
  batteryCapacity: { type: String },
  protocol: { type: String },
  telemetry: { type: String },
});

export default DroneComponentSchema;

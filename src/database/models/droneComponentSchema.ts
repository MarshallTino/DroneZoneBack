import { Schema } from "mongoose";

const droneComponentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  componentType: {
    type: String,
    required: true,
  },
  pricePerUnit: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  sizeOrmountingSize: {
    type: String,
    required: true,
  },
  power: {
    type: String,
    required: false,
  },
  connector: {
    type: String,
    required: false,
  },
  batteryVoltage: {
    type: String,
    required: false,
  },
  batteryCapacity: {
    type: String,
    required: false,
  },
  telemetry: {
    type: String,
    required: false,
  },
  protocol: {
    type: String,
    required: false,
  },
});

export default droneComponentSchema;

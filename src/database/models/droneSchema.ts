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
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sizeOrmountingSize: {
    type: String,
    required: true,
  },
});

const droneSchema = new Schema({
  droneImage: {
    type: String,
    required: true,
  },
  schemaImage: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  categories: {
    difficulty: {
      type: String,
      required: true,
    },
    transmissionType: {
      type: String,
      required: true,
    },
    droneClass: {
      type: String,
      required: true,
    },
  },
  components: [droneComponentSchema],
});

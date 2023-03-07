import mongoose from "mongoose";
import debug from "debug";

const createDebug = debug("dronezone-api:database");

export const connectDatabase = async (url: string) => {
  mongoose.set("strictQuery", false);
  createDebug("Database conected");
  await mongoose.connect(url);
  mongoose.set("toJSON", {
    virtuals: true,
    transform(doc, ret) {
      delete ret.__id;
      delete ret.__v;
    },
  });
};

export default connectDatabase;

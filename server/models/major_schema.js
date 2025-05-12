import mongoose, { Schema, model } from "mongoose";

const majorSchema = new Schema({
  name: { type: String, required: true },
  stores: [{ type: mongoose.Schema.Types.ObjectId, ref: "Store" }],
});

export default model("Major", majorSchema, "major");

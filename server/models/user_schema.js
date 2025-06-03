import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  userLoginId: { type: String, required: true, unique: true },
  userLoginPw: { type: String, required: true },
  username: { type: String, required: true },
  gender: { type: String, enum: ["남", "여"], required: true },
  major: { type: String, required: true },
  studentNumber: { type: Number, required: true },
  currentRoom: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  historyRoom: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Store" }],
  profileImage: {type: String, default: '/images/default-profile.png'},
});

export default model("User", userSchema, "user");

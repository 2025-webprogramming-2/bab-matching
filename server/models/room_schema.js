import mongoose, { Schema, model } from 'mongoose';
import { getCurrentTime } from '../utils/currentTime.js';

const chatSchema = new Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: getCurrentTime },
});

const roomSchema = new Schema(
  {
    currentUserId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      // type: String,
      ref: 'Store',
      required: true,
    },
    time: {
      start: { type: Number, required: true },
      end: { type: Number, required: true },
    },
    filter: {
      gender: { type: String, enum: ['male', 'female'], required: false },
      major: { type: String, required: false },
    },
    currentCount: { type: Number, default: 1 }, // 프론트에서 실시간 갱신 필요
    maxCount: { type: Number, required: true },
    isFilled: { type: Boolean, default: false },
    chats: [chatSchema],
  },
  { timestamps: true },
);

export default model('Room', roomSchema, 'room');

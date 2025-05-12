import mongoose, { Schema, model } from 'mongoose';

const storeSchema = new Schema({
  name: { type: String },
  info: [
    {
      major: { type: String },
      benefits: { type: [String] }, // 혜택 내용 배열
    },
  ],
  verify: { type: String },
  img: { type: String }, // 이미지 URL
});

export default model('Store', storeSchema, 'store');


import mongoose, { Schema, model } from 'mongoose';

const storeSchema = new Schema({
  college: { type: String, required: true }, // 예: "공과대학"
  type: { type: String, enum: ['cafe', 'restaurant', 'pub'], required: true }, // 예: "cafe"
  name: { type: String, required: true }, // 예: "공대카페1"
  benefits: { type: [String], default: [] }, // 혜택 리스트
  img: { type: String, default: '' }, // 이미지 경로 
  storeIndex: { type: String, required: true },
});

export default model('Store', storeSchema, 'store');


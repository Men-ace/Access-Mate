// schemas/resultSchema.js
import mongoose from 'mongoose';
import { violationSchema } from './violationSchema.js';

const resultSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      index: true,
    },
    violations: {
      type: [violationSchema],
      default: [],
    },
    timestamp: {
      type: String,
      required: true,
      default: () => new Date().toISOString(),
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default mongoose.model('Result', resultSchema);
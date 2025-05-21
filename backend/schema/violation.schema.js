// schemas/violationSchema.js
import mongoose from 'mongoose';

export const violationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true, // e.g., "link-name"
  },
  description: {
    type: String,
    required: true, // e.g., "Links must have discernible text"
  },
  impact: {
    type: String,
    required: true, // e.g., "serious"
  },
  helpUrl: {
    type: String,
    required: true, // e.g., "https://dequeuniversity.com/rules/axe/4.4/link-name"
  },
});
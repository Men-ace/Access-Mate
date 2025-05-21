// models/resultModel.js

import resultModel from "../schema/results.schema.js";


// Get all results (with pagination, optional URL filter, and populated violations)
export const getAllResults = async ({ url, page = 1, limit = 10 } = {}) => {
  const query = url ? { url } : {};
  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);

  const total = await resultModel.countDocuments(query);
  const results = await resultModel.find(query)
    .populate('violations') // Populate violation documents
    .skip((parsedPage - 1) * parsedLimit)
    .limit(parsedLimit)
    .lean();

  return {
    results,
    total,
    page: parsedPage,
    limit: parsedLimit,
  };
};

// Get result by ID
export const getResultById = (id) => {
  return resultModel.findById(id).populate('violations').lean();
};

// Create a new result
export const createResult = (resultObj) => {
  return new resultModel(resultObj).save();
};

// Update result (e.g., add violation IDs)
export const updateResultViolations = (id, violationIds) => {
  return resultModel.findByIdAndUpdate(
    id,
    { $push: { violations: { $each: violationIds } } },
    { new: true }
  ).populate('violations').lean();
};
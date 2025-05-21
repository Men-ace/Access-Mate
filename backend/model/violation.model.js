import violationModel from '../schema/violation.schema.js';

// Get all violations (with pagination and optional filters)
export const getAllViolations = async ({ url, ruleId, resultId, page = 1, limit = 10 } = {}) => {
  const query = {};
  if (url) query.url = url;
  if (ruleId) query.ruleId = ruleId;
  if (resultId) query.resultId = resultId;

  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);

  const total = await Violation.countDocuments(query);
  const violations = await violationModel.find(query)
    .skip((parsedPage - 1) * parsedLimit)
    .limit(parsedLimit)
    .lean();

  return {
    violations,
    total,
    page: parsedPage,
    limit: parsedLimit,
  };
};

// Get violation by ID
export const getViolationById = (id) => {
  return violationModel.findById(id).lean();
};

// Create a new violation
export const createViolation = (violationObj) => {
  return new violationModel(violationObj).save();
};

// Create multiple violations (bulk)
export const createViolations = (violationObjs) => {
  return violationModel.insertMany(violationObjs);
};
/**
 * Configuration for category flows and form steps
 */

export const FORM_FLOWS = {
  housing: [
    "AdForm",
    "LocationForm",
    "Facilities",
    "UploadPics",
    "ContactInfo",
    "Conditions",
  ],
  digital: ["DigitalForm", "UploadPics", "ContactInfo", "Conditions"],
  default: ["AdForm", "ContactInfo", "Conditions"],
};

/**
 * Get flow for a category
 * @param {Object} category - The selected category
 * @param {Array} path - Current navigation path
 * @returns {Array} Array of form step names
 */
export const getFlowForCategory = (category, path) => {
  const root = path[1];
  const key = root?.slug ?? root?.id ?? "default";
  return FORM_FLOWS[key] || FORM_FLOWS.default;
};

/**
 * Generate pagination labels
 * @param {Array} currentFlow - Current form flow
 * @returns {Array} Array of label strings
 */
export const getPaginationLabels = (currentFlow) => {
  return ["دسته‌بندی‌ها", ...currentFlow];
};

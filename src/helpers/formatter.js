/**
 * Format number with comma-separated
 *
 * @param {number} value Value you want to format
 * @returns {string} Formatted value
 */
export const separateByComma = value => {
  const castedValue = `${value}`;
  return castedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

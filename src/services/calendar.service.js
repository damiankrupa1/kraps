const httpStatus = require('http-status');
const { Calendar } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a calendar record
 * @param {Object} calendarBody
 * @returns {Promise<Calendar>}
 */
const createCalendarRecord = async (calendarBody) => {
  return Calendar.create(calendarBody);
};

/**
 * Query for calendar records
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCalendarRecords = async (filter, options) => {
  console.log(Calendar)
  const calendar = await Calendar.paginate(filter, options);
  return calendar;
};

/**
 * Get calendar by id
 * @param {ObjectId} id
 * @returns {Promise<Calendar>}
 */
const getCalendarById = async (id) => {
  return Calendar.findById(id);
};

/**
 * Update calendar record by id
 * @param {ObjectId} calendarRecordId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateCalendarById = async (calendarRecordId, updateBody) => {
  const calendar = await getCalendarById(calendarRecordId);
  if (!calendar) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Calendar record not found');
  }
  Object.assign(calendar, updateBody);
  await calendar.save();
  return calendar;
};

/**
 * Delete calendar record by id
 * @param {ObjectId} calendarRecordId
 * @returns {Promise<User>}
 */
const deleteCalendarRecordById = async (calendarRecordId) => {
  const user = await getCalendarById(calendarRecordId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Calendar record not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createCalendarRecord,
  queryCalendarRecords,
  getCalendarById,
  updateCalendarById,
  deleteCalendarRecordById,
};

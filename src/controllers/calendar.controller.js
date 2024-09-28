const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { calendarService } = require('../services');

const createCalendarRecord = catchAsync(async (req, res) => {
  const calendar = await calendarService.createCalendarRecord(req.body);
  res.status(httpStatus.CREATED).send(calendar);
});

const getCalendarRecords = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'start', 'end']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await calendarService.queryCalendarRecords(filter, options);
  res.send(result);
});

const getCalendarRecord = catchAsync(async (req, res) => {
  const calendar = await calendarService.getCalendarById(req.params.calendarRecordId);
  if (!calendar) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Calendar record not found');
  }
  res.send(calendar);
});

const udpateCalendarRecord = catchAsync(async (req, res) => {
  const calendar = await calendarService.updateCalendarById(req.params.calendarRecordId, req.body);
  res.send(calendar);
});

const deleteCalendarRecord = catchAsync(async (req, res) => {
  await calendarService.deleteCalendarRecordById(req.params.calendarRecordId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCalendarRecord,
  getCalendarRecords,
  getCalendarRecord,
  udpateCalendarRecord,
  deleteCalendarRecord,
};

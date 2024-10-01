/* eslint-disable prettier/prettier */
const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCalendarRecord = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    name: Joi.string().required(),
    start: Joi.string().required(),
    end: Joi.string().required(),
  }),
};

const getCalendarRecords = {
  query: Joi.object().keys({
    title: Joi.string(),
    name: Joi.string(),
    start: Joi.string(),
    end: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCalendarRecord = {
  params: Joi.object().keys({
    calendarId: Joi.string().custom(objectId),
  }),
};

const updateCalendarRecord = {
  params: Joi.object().keys({
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      name: Joi.string(),
    })
    .min(1),
};

const deleteCalendarRecord = {
  params: Joi.object().keys({
  }),
};

module.exports = {
  createCalendarRecord,
  getCalendarRecords,
  getCalendarRecord,
  updateCalendarRecord,
  deleteCalendarRecord,
};

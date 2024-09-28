/* eslint-disable prettier/prettier */
const Joi = require('joi');

const createCalendarRecord = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getCalendarRecords = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCalendarRecord = {
  params: Joi.object().keys({
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

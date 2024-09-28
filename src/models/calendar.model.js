const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const calendarSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    color: {
      type: String,
    },
    isEditable: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
calendarSchema.plugin(toJSON);
calendarSchema.plugin(paginate);

/**
 * @typedef Calendar
 */
const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;

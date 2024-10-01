const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const calendarValidation = require('../../validations/calendar.validation');
const calendarController = require('../../controllers/calendar.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('manageCalendarRecords'),
    validate(calendarValidation.createCalendarRecord),
    calendarController.createCalendarRecord
  )
  .get(auth('getCalendarRecords'), validate(calendarValidation.getCalendarRecords), calendarController.getCalendarRecords);

router
  .route('/:calendarId')
  .get(auth('getCalendarRecords'), validate(calendarValidation.getCalendarRecord), calendarController.getCalendarRecord)
  .patch(
    auth('manageCalendarRecords'),
    validate(calendarValidation.updateCalendarRecord),
    calendarController.udpateCalendarRecord
  )
  .delete(
    auth('manageCalendarRecords'),
    validate(calendarValidation.deleteCalendarRecord),
    calendarController.deleteCalendarRecord
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Calendar
 *   description: Calendar management and retrieval
 */

/**
 * @swagger
 * /calendar:
 *   post:
 *     summary: Create a calendar record
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - name
 *               - start
 *               - end
 *             properties:
 *               name:
 *                 type: string
 *               title:
 *                 type: string
 *               start:
 *                 type: string
 *               end:
 *                 type: string
 *             example:
 *               name: fake name
 *               title: fake title
 *               start: '2024-10-01 11:11'
 *               end: '2024-10-01 15:11'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Calendar'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all calendar records
 *     description: Only admins can retrieve all calendar records.
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Calendar event name
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Calendar event user
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of calendar events
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Calendar'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /calendar/{id}:
 *   get:
 *     summary: Get a calendar event
 *     description: get calendar events
 *     tags: [Calendar events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Calendar event id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Calendar'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a calendar event
 *     description: Calendar
 *     tags: [Calendar events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               name:
 *                 type: string
 *               start:
 *                 type: string
 *               end:
 *                 type: string
 *               color:
 *                 type: string
 *               isEditable:
 *                 type: boolean
 *             example:
 *               name: fake name
 *               title: fake title
 *               start: '2024-10-01 11:11'
 *               end: '2024-10-01 15:11'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Calendar'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a calendar event
 *     description: Delete
 *     tags: [Calendar events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Calendar event id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

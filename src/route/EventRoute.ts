import express from 'express';

import EventController from '../controller/EventController';

const eventRoute = express.Router();

// These route's endPoints would not be required to pass through check of authMiddleware
const basePath = '/api/v1/event';

eventRoute.post(basePath + '/create', EventController.createEvent);

eventRoute.post(basePath + '/join', EventController.joinEvent);

eventRoute.get(basePath + '/next', EventController.getNextEvent);

eventRoute.get(basePath + '/winner/:eventId', EventController.getEventWinner);

eventRoute.get(
  basePath + '/lastWeekWinner/:eventId',
  EventController.getLastWeekWinners
);

export default eventRoute;

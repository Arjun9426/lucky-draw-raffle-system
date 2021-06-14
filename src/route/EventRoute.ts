import express from 'express';

import EventController from '../controller/EventController';

const eventRoute = express.Router();

// These route's endPoints would not be required to pass through check of authMiddleware
const basePath = '/api/v1/event';

// done
eventRoute.post(basePath + '/create', EventController.createEvent);

// done
eventRoute.post(basePath + '/join', EventController.joinEvent);

// done
eventRoute.get(basePath + '/next', EventController.getNextEvent);

// done
eventRoute.get(basePath + '/winner/:eventId', EventController.getEventWinner);

eventRoute.get(
  basePath + '/lastWeekWinner',
  EventController.getLastWeekWinners
);

export default eventRoute;

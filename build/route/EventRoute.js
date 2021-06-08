"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EventController_1 = __importDefault(require("../controller/EventController"));
const eventRoute = express_1.default.Router();
// These route's endPoints would not be required to pass through check of authMiddleware
const basePath = '/api/v1/event';
eventRoute.post(basePath + '/create', EventController_1.default.createEvent);
eventRoute.post(basePath + '/join', EventController_1.default.joinEvent);
eventRoute.get(basePath + '/next', EventController_1.default.getNextEvent);
eventRoute.get(basePath + '/winner/:eventId', EventController_1.default.getEventWinner);
eventRoute.get(basePath + '/lastWeekWinner/:eventId', EventController_1.default.getLastWeekWinners);
exports.default = eventRoute;

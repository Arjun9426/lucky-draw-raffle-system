"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceError_1 = __importDefault(require("../common/errors/ServiceError"));
const EventFactory_1 = __importDefault(require("../factory/EventFactory"));
class EventService {
    static createEvent(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.startTime &&
                request.endTime &&
                Date.now() < request.startTime < request.endTime) {
                const response = yield EventFactory_1.default.getInstance().createEvent(request);
                return response;
            }
            else {
                throw ServiceError_1.default.getError('INVALID_PARAMS', 'time properties are not valid');
            }
        });
    }
    static joinEvent(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventId = request.body.eventId;
            const userId = request.body.userId;
            if (!eventId || !userId) {
                throw ServiceError_1.default.getError('INVALID_PARAMS', 'eventId and userId are not valid');
            }
            const events = yield EventFactory_1.default.getInstance().getEvent(eventId);
            if (!events || !events.length) {
                // event does not exists
                throw ServiceError_1.default.getError('EVENT_DOES_NOT_EXISTS', 'events does not exists');
            }
            if (events && events[0] && events[0].end_time < Date.now()) {
                // event does not exists
                throw ServiceError_1.default.getError('EVENT_IS_COMPLETED', 'user can join an ongoing event only');
            }
            const results = yield EventFactory_1.default.getInstance().getRelation(eventId, userId);
            if (results.length !== 0) {
                return { message: 'registered' };
            }
            yield EventFactory_1.default.getInstance().joinEvent(request);
            return { message: 'registered' };
        });
    }
    static getNextEvent() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield EventFactory_1.default.getInstance().getNextEvent();
            return response;
        });
    }
    static getWinner(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield EventFactory_1.default.getInstance().getEvent(eventId);
            if (!results || !results.length) {
                // event does not exists
                throw ServiceError_1.default.getError('EVENT_DOES_NOT_EXISTS', 'events does not exists');
            }
            if (results[0].end_time < Date.now()) {
                // not ended
                throw ServiceError_1.default.getError('EVENT_NOT_COMPLETED', 'event not completed');
            }
            if (results && results[0] && results[0]['winner_user_id']) {
                // winner already calculated
                return results[0]['winner_user_id'];
            }
            const users = yield EventFactory_1.default.getInstance().getEventUsers(eventId);
            if (!users || !users.length) {
                throw ServiceError_1.default.getError('EVENT_DO_NOT_HAVE_USERS', 'event do not have any users');
            }
            // calculating winner randomly
            const winnerUser = users[Math.floor(Math.random() * users.length)];
            // setting winner
            EventFactory_1.default.getInstance().setEventWinner(eventId, winnerUser);
            return winnerUser;
        });
    }
    static getLastWeekWinners() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield EventFactory_1.default.getInstance().getLastWeekWinners();
            return response;
        });
    }
}
exports.default = EventService;

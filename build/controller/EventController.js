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
const EventService_1 = __importDefault(require("../Service/EventService"));
class EventController {
    static createEvent(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield EventService_1.default.createEvent(request.body);
                res.send(response);
            }
            catch (e) {
                return next(e);
            }
        });
    }
    static joinEvent(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield EventService_1.default.joinEvent(request.body);
                res.send(response);
            }
            catch (e) {
                return next(e);
            }
        });
    }
    static getNextEvent(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield EventService_1.default.getNextEvent();
                res.send(response);
            }
            catch (e) {
                return next(e);
            }
        });
    }
    static getEventWinner(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventId = request.params.eventId || 0;
            try {
                const response = yield EventService_1.default.createEvent(eventId);
                res.send(response);
            }
            catch (e) {
                return next(e);
            }
        });
    }
    static getLastWeekWinners(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield EventService_1.default.getLastWeekWinners();
                res.send(response);
            }
            catch (e) {
                return next(e);
            }
        });
    }
}
exports.default = EventController;

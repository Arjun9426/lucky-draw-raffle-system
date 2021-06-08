"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventQuery_1 = __importDefault(require("../db/EventQuery"));
class EventCRUDFactory {
    static getInstance() {
        if (!EventCRUDFactory.queryInstances)
            EventCRUDFactory.queryInstances = new EventQuery_1.default();
        return EventCRUDFactory.queryInstances;
    }
}
exports.default = EventCRUDFactory;

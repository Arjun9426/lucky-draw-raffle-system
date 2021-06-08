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
const DatabaseService_1 = __importDefault(require("./DatabaseService"));
const RaffleTablesName_1 = __importDefault(require("../common/enums/RaffleTablesName"));
const QueryType_1 = __importDefault(require("../common/enums/QueryType"));
const MySqlFormat_1 = __importDefault(require("./MySqlFormat"));
class EventQuery {
    constructor() {
        this.eventTableName = RaffleTablesName_1.default.EVENT;
        this.eventUserRelationshipTableName = RaffleTablesName_1.default.EVENT_RELATIONSHIP;
    }
    createEvent(eventObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                query: `insert into ${this.eventTableName} set ?`,
                values: eventObj,
            };
            return EventQuery.dbService.executeQuery(MySqlFormat_1.default.getSqlFormatQuery(query), QueryType_1.default.INSERT);
        });
    }
    joinEvent(relObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                query: `insert into ${this.eventUserRelationshipTableName} set ?`,
                values: relObj,
            };
            return EventQuery.dbService.executeQuery(MySqlFormat_1.default.getSqlFormatQuery(query), QueryType_1.default.INSERT);
        });
    }
    // return upcoming event
    getRelation(eventId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getEventQuery = {
                query: `SELECT rel_type FROM ${this.eventUserRelationshipTableName} 
      where event_id = ? and user_id = ?`,
                values: [eventId, userId],
            };
            return EventQuery.dbService.executeQuery(MySqlFormat_1.default.getSqlFormatQuery(getEventQuery), QueryType_1.default.SELECT);
        });
    }
    // return upcoming event
    getNextEvent() {
        return __awaiter(this, void 0, void 0, function* () {
            // Getting created user from DB
            const eventFields = [
                'event_id',
                'event_name',
                'start_time',
                'end_time',
                'prize',
                'winner_user_id',
                'joining_fee',
            ].map((value) => `${this.eventTableName}.${value}`);
            const currentTime = Date.now();
            const getEventQuery = {
                query: `SELECT ${eventFields} FROM ${this.eventTableName} where unix_timestamp(${this.eventTableName}.start_time) > ${currentTime}
       order by ${this.eventTableName}.start_time desc limit 0,1`,
            };
            return EventQuery.dbService.executeQuery(MySqlFormat_1.default.getSqlFormatQuery(getEventQuery), QueryType_1.default.SELECT);
        });
    }
    // return  event with eventId
    getEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Getting created user from DB
            const eventFields = [
                'event_id',
                'event_name',
                'start_time',
                'end_time',
                'prize',
                'winner_user_id',
                'joining_fee',
            ].map((value) => `${this.eventTableName}.${value}`);
            const getEventQuery = {
                query: `SELECT ${eventFields} FROM ${this.eventTableName} where event_id = ? 
       order by ${this.eventTableName}.start_time desc limit 0,1`,
                values: eventId,
            };
            return EventQuery.dbService.executeQuery(MySqlFormat_1.default.getSqlFormatQuery(getEventQuery), QueryType_1.default.SELECT);
        });
    }
    setEventWinner(eventId, winnerUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getEventQuery = {
                query: `update ${this.eventTableName} set winner_user_id = ? where event_id=?`,
                values: [winnerUserId, eventId],
            };
            return EventQuery.dbService.executeQuery(MySqlFormat_1.default.getSqlFormatQuery(getEventQuery), QueryType_1.default.UPDATE);
        });
    }
    getEventUsers(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getEventQuery = {
                query: `SELECT user_id FROM ${this.eventUserRelationshipTableName} where event_id = ? `,
                values: [eventId],
            };
            return EventQuery.dbService.executeQuery(MySqlFormat_1.default.getSqlFormatQuery(getEventQuery), QueryType_1.default.SELECT);
        });
    }
    // winner of last week events who have completed in last one week
    getLastWeekWinners() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTime = Date.now() / 1000;
            const lastWeekTime = Date.now() / 1000 - 7 * 24 * 60 * 60;
            const getEventQuery = {
                query: `SELECT winner_user_id FROM ${this.eventTableName} where unix_timestamp(${this.eventTableName}.end_time) < ${currentTime} 
      and  unix_timestamp(${this.eventTableName}.end_time) > ${lastWeekTime} `,
            };
            return EventQuery.dbService.executeQuery(MySqlFormat_1.default.getSqlFormatQuery(getEventQuery), QueryType_1.default.SELECT);
        });
    }
}
exports.default = EventQuery;
EventQuery.dbService = DatabaseService_1.default.getInstance();

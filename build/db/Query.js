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
const QueryType_1 = __importDefault(require("../common/enums/QueryType"));
class Query {
    constructor(pool) {
        pool.on('acquire', function (connection) {
            console.log('[DB] Connection %d acquired', connection.threadId);
        });
        pool.on('connection', function (connection) {
            console.log('[DB] connection created setting isolation level and auto-commit');
            connection.query('SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED');
            connection.query('SET autocommit = 1');
        });
        pool.on('release', function (connection) {
            console.log('[DB] Connection %d released', connection.threadId);
        });
        pool.on('enqueue', function () {
            console.log('[DB] Waiting for available connection slot');
        });
        this.pool = pool;
    }
    executeQuery(query, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.pool.promise().query(query);
            let result = rows;
            switch (type) {
                case QueryType_1.default.SELECT:
                    break;
                case QueryType_1.default.INSERT:
                    result = result.insertId;
                    break;
                case QueryType_1.default.UPDATE:
                case QueryType_1.default.DELETE:
                    result = result.affectedRows;
                    break;
                default:
                    break;
            }
            return result;
        });
    }
}
exports.default = Query;

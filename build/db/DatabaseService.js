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
const mysql2_1 = __importDefault(require("mysql2"));
const Query_1 = __importDefault(require("./Query"));
const DBError_1 = __importDefault(require("../common/errors/DBError"));
const config_1 = __importDefault(require("../common/config"));
class DatabaseService {
    constructor() {
        const poolObj = mysql2_1.default.createPool(config_1.default.getDBConfig());
        this.pool = new Query_1.default(poolObj);
    }
    static getInstance() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }
    executeQuery(query, queryType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('[DB] Running query: %s', query);
                const result = yield this.pool.executeQuery(query, queryType);
                console.log('[DB] Query Result: %s', JSON.stringify(result));
                return result;
            }
            catch (err) {
                throw new DBError_1.default('[DB] ', err);
            }
        });
    }
}
exports.default = DatabaseService;

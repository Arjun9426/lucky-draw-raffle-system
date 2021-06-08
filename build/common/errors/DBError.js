"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DBError {
    constructor(name, message) {
        this.name = name;
        this.message = message;
    }
    getError(name, message) {
        return new DBError(name, message);
    }
}
exports.default = DBError;

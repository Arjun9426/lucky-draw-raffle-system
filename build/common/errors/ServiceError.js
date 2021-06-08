"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceError {
    constructor(name, message) {
        this.name = name;
        this.message = message;
    }
    static getError(name, message) {
        return new ServiceError(name, message);
    }
}
exports.default = ServiceError;

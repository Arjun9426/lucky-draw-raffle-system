"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryType;
(function (QueryType) {
    QueryType[QueryType["SELECT"] = 0] = "SELECT";
    QueryType[QueryType["INSERT"] = 1] = "INSERT";
    QueryType[QueryType["UPDATE"] = 2] = "UPDATE";
    QueryType[QueryType["DELETE"] = 3] = "DELETE";
})(QueryType || (QueryType = {}));
exports.default = QueryType;

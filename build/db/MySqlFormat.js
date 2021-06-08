"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql2');
class MysqlUtil {
    static getSqlFormatQuery(query) {
        return mysql.format(query.query, query.values);
    }
    static getTableNameWithOrg(tableName, orgId) {
        return `${tableName}_${orgId}`;
    }
    static getEscapeValue(value) {
        return mysql.escape(value);
    }
}
exports.default = MysqlUtil;

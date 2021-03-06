const mysql = require('mysql2');

class MysqlUtil {
  public static getSqlFormatQuery(query: any): string {
    return mysql.format(query.query, query.values);
  }

  public static getTableNameWithOrg(tableName: string, orgId: number) {
    return `${tableName}_${orgId}`;
  }

  public static getEscapeValue(value: number) {
    return mysql.escape(value);
  }
}

export default MysqlUtil;

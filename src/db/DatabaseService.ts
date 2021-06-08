import QueryType from '../common/enums/QueryType';
import mysql from 'mysql2';
import Query from './Query';
import DBError from '../common/errors/DBError';
import { Pool } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';
import Config from '../common/config';

class DatabaseService {
  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  private static instance: DatabaseService;

  private pool: Query;

  private constructor() {
    const poolObj: Pool = mysql.createPool(Config.getDBConfig());
    this.pool = new Query(poolObj);
  }
  public async executeQuery(query: string, queryType: QueryType): Promise<any> {
    try {
      console.log('[DB] Running query: %s', query);
      const result = await this.pool.executeQuery(query, queryType);
      console.log('[DB] Query Result: %s', JSON.stringify(result));
      return result;
    } catch (err) {
      throw new DBError('[DB] ', err);
    }
  }
}

export default DatabaseService;

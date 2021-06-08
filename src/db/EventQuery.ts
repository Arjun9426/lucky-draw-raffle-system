import { PoolConnection } from 'mysql2/promise';
import DatabaseService from './DatabaseService';
import RaffleTablesName from '../common/enums/RaffleTablesName';
import QueryType from '../common/enums/QueryType';
import MysqlUtil from './MySqlFormat';
export default class EventQuery {
  private static dbService: DatabaseService = DatabaseService.getInstance();
  private readonly eventTableName: RaffleTablesName;
  private readonly eventUserRelationshipTableName: RaffleTablesName;

  constructor() {
    this.eventTableName = RaffleTablesName.EVENT;
    this.eventUserRelationshipTableName = RaffleTablesName.EVENT_RELATIONSHIP;
  }

  public async createEvent(eventObj: any): Promise<number> {
    const query: any = {
      query: `insert into ${this.eventTableName} set ?`,
      values: eventObj,
    };

    return EventQuery.dbService.executeQuery(
      MysqlUtil.getSqlFormatQuery(query),
      QueryType.INSERT
    );
  }

  public async joinEvent(relObj: any): Promise<number> {
    const query: any = {
      query: `insert into ${this.eventUserRelationshipTableName} set ?`,
      values: relObj,
    };

    return EventQuery.dbService.executeQuery(
      MysqlUtil.getSqlFormatQuery(query),
      QueryType.INSERT
    );
  }

  // return upcoming event
  public async getRelation(eventId: any, userId: any): Promise<number> {
    const getEventQuery = {
      query: `SELECT rel_type FROM ${this.eventUserRelationshipTableName} 
      where event_id = ? and user_id = ?`,
      values: [eventId, userId],
    };
    return EventQuery.dbService.executeQuery(
      MysqlUtil.getSqlFormatQuery(getEventQuery),
      QueryType.SELECT
    );
  }
  // return upcoming event
  public async getNextEvent(): Promise<number> {
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
    const currentTime: number = Date.now();
    const getEventQuery = {
      query: `SELECT ${eventFields} FROM ${this.eventTableName} where unix_timestamp(${this.eventTableName}.start_time) > ${currentTime}
       order by ${this.eventTableName}.start_time desc limit 0,1`,
    };
    return EventQuery.dbService.executeQuery(
      MysqlUtil.getSqlFormatQuery(getEventQuery),
      QueryType.SELECT
    );
  }

  // return  event with eventId
  public async getEvent(eventId: number): Promise<number> {
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
    return EventQuery.dbService.executeQuery(
      MysqlUtil.getSqlFormatQuery(getEventQuery),
      QueryType.SELECT
    );
  }

  public async setEventWinner(
    eventId: number,
    winnerUserId: number
  ): Promise<number> {
    const getEventQuery = {
      query: `update ${this.eventTableName} set winner_user_id = ? where event_id=?`,
      values: [winnerUserId, eventId],
    };
    return EventQuery.dbService.executeQuery(
      MysqlUtil.getSqlFormatQuery(getEventQuery),
      QueryType.UPDATE
    );
  }

  public async getEventUsers(eventId: number): Promise<any> {
    const getEventQuery = {
      query: `SELECT user_id FROM ${this.eventUserRelationshipTableName} where event_id = ? `,
      values: [eventId],
    };
    return EventQuery.dbService.executeQuery(
      MysqlUtil.getSqlFormatQuery(getEventQuery),
      QueryType.SELECT
    );
  }

  // winner of last week events who have completed in last one week
  public async getLastWeekWinners(): Promise<any> {
    const currentTime: number = Date.now() / 1000;
    const lastWeekTime: number = Date.now() / 1000 - 7 * 24 * 60 * 60;

    const getEventQuery = {
      query: `SELECT winner_user_id FROM ${this.eventTableName} where unix_timestamp(${this.eventTableName}.end_time) < ${currentTime} 
      and  unix_timestamp(${this.eventTableName}.end_time) > ${lastWeekTime} `,
    };
    return EventQuery.dbService.executeQuery(
      MysqlUtil.getSqlFormatQuery(getEventQuery),
      QueryType.SELECT
    );
  }
}

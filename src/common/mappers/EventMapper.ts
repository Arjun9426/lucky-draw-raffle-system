export class EventMapper {
  public static getCreateEventDbObj(obj: any): any {
    const dbObj: any = {};
    if (
      obj.startTime &&
      (typeof obj.startTime === 'number' || parseInt(obj.startTime))
    )
      dbObj['start_time'] = new Date(obj.startTime);

    if (
      obj.endTime &&
      (typeof obj.endTime === 'number' || parseInt(obj.endTime))
    )
      dbObj['end_time'] = new Date(obj.endTime);

    if (obj.eventName) dbObj['event_name'] = obj.eventName;

    if (obj.prize) dbObj['prize'] = obj.prize;

    if (obj.joining_fee) dbObj['joining_fee'] = obj.joining_fee;
    console.log(dbObj);
    return dbObj;
  }

  public static getJoinEventDbObj(obj: any): any {
    const dbObj: any = {};

    if (obj.eventId) dbObj['event_id'] = obj.eventId;

    if (obj.userId) dbObj['user_id'] = obj.userId;

    // As of now only one rel_type
    if (obj.userId) dbObj['rel_type'] = 1;

    return dbObj;
  }
}

import EventQuery from '../db/EventQuery';

class EventCRUDFactory {
  public static getInstance(orgId: number): EventQuery {
    if (!EventCRUDFactory.queryInstances) {
      EventCRUDFactory.queryInstances = {};
    }
    if (!EventCRUDFactory.queryInstances[orgId]) {
      EventCRUDFactory.queryInstances[orgId] = new EventQuery(orgId);
    }
    return EventCRUDFactory.queryInstances[orgId];
  }
  private static queryInstances: any;
}

export default EventCRUDFactory;

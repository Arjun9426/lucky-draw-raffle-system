import EventQuery from '../db/EventQuery';

class EventCRUDFactory {
  public static getInstance(): EventQuery {
    if (!EventCRUDFactory.queryInstances)
      EventCRUDFactory.queryInstances = new EventQuery();

    return EventCRUDFactory.queryInstances;
  }
  private static queryInstances: any;
}

export default EventCRUDFactory;

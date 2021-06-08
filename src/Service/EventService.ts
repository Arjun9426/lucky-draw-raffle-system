import ServiceError from '../common/errors/ServiceError';
import EventFactory from '../factory/EventFactory';
class EventService {
  static async createEvent(request: any): Promise<any> {
    if (
      request.startTime &&
      request.endTime &&
      Date.now() < request.startTime < request.endTime
    ) {
      const response: any = await EventFactory.getInstance().createEvent(
        request
      );
      return response;
    } else {
      throw ServiceError.getError(
        'INVALID_PARAMS',
        'time properties are not valid'
      );
    }
  }

  static async joinEvent(request: any): Promise<any> {
    const eventId: any = request.body.eventId;
    const userId: any = request.body.userId;
    if (!eventId || !userId) {
      throw ServiceError.getError(
        'INVALID_PARAMS',
        'eventId and userId are not valid'
      );
    }
    const events: any = await EventFactory.getInstance().getEvent(eventId);
    if (!events || !events.length) {
      // event does not exists
      throw ServiceError.getError(
        'EVENT_DOES_NOT_EXISTS',
        'events does not exists'
      );
    }
    if (events && events[0] && events[0].end_time < Date.now()) {
      // event does not exists
      throw ServiceError.getError(
        'EVENT_IS_COMPLETED',
        'user can join an ongoing event only'
      );
    }

    const results: any = await EventFactory.getInstance().getRelation(
      eventId,
      userId
    );
    if (results.length !== 0) {
      return { message: 'registered' };
    }
    await EventFactory.getInstance().joinEvent(request);
    return { message: 'registered' };
  }

  static async getNextEvent(): Promise<any> {
    const response: any = await EventFactory.getInstance().getNextEvent();
    return response;
  }

  static async getWinner(eventId: any): Promise<void> {
    const results: any = await EventFactory.getInstance().getEvent(eventId);
    if (!results || !results.length) {
      // event does not exists
      throw ServiceError.getError(
        'EVENT_DOES_NOT_EXISTS',
        'events does not exists'
      );
    }
    if (results[0].end_time < Date.now()) {
      // not ended
      throw ServiceError.getError('EVENT_NOT_COMPLETED', 'event not completed');
    }
    if (results && results[0] && results[0]['winner_user_id']) {
      // winner already calculated
      return results[0]['winner_user_id'];
    }
    const users: any = await EventFactory.getInstance().getEventUsers(eventId);
    if (!users || !users.length) {
      throw ServiceError.getError(
        'EVENT_DO_NOT_HAVE_USERS',
        'event do not have any users'
      );
    }
    // calculating winner randomly
    const winnerUser: any = users[Math.floor(Math.random() * users.length)];
    // setting winner
    EventFactory.getInstance().setEventWinner(eventId, winnerUser);
    return winnerUser;
  }

  static async getLastWeekWinners(): Promise<void> {
    const response: any = await EventFactory.getInstance().getLastWeekWinners();
    return response;
  }
}

export default EventService;

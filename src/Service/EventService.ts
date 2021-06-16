import { EventMapper } from '../common/mappers/EventMapper';
import ServiceError from '../common/errors/ServiceError';
import EventFactory from '../factory/EventFactory';
class EventService {
  static async createEvent(request: any): Promise<any> {
    // this check can be made more better
    if (
      request.startTime &&
      request.endTime &&
      Date.now() < request.startTime &&
      request.startTime < request.endTime
    ) {
      const dbObj: any = EventMapper.getCreateEventDbObj(request);
      const response: any = await EventFactory.getInstance().createEvent(dbObj);
      return response;
    } else {
      throw ServiceError.getError(
        'INVALID_PARAMS',
        'Time properties are not valid'
      );
    }
  }

  static async joinEvent(request: any): Promise<any> {
    const eventId: any = (request && request.eventId) || 0;
    const userId: any = (request && request.userId) || 0;
    if (!eventId || !userId) {
      throw ServiceError.getError(
        'INVALID_PARAMS',
        'EventId and userId are not valid'
      );
    }
    const events: any = await EventFactory.getInstance().getEvent(eventId);
    if (!events || !events.length) {
      // event does not exists
      throw ServiceError.getError(
        'EVENT_DOES_NOT_EXISTS',
        'Events does not exists'
      );
    }
    if (
      events &&
      events[0] &&
      new Date(events[0].end_time).getTime() < Date.now()
    ) {
      // event is completed
      throw ServiceError.getError(
        'EVENT_IS_COMPLETED',
        'User can join an upcoming or ongoing event only'
      );
    }

    // event is live or upcoming
    const results: any = await EventFactory.getInstance().getRelation(
      eventId,
      userId
    );
    if (results.length !== 0) {
      // already registered.. this check will make this api idempotent
      return { message: 'registered' };
    }
    const joinEventDbObj: any = EventMapper.getJoinEventDbObj(request);
    const relationId: number = await EventFactory.getInstance().joinEvent(
      joinEventDbObj
    );
    if (relationId) return { message: 'registered' };
    else {
      // unable to join event because of some unnow reason
      throw ServiceError.getInternalServerError();
    }
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
        'Events does not exists'
      );
    }
    if (results[0] && new Date(results[0].end_time).getTime() > Date.now()) {
      // not completed so far
      console.log(new Date(results[0].end_time).getTime(), Date.now());
      throw ServiceError.getError('EVENT_NOT_COMPLETED', 'Event not completed');
    }
    if (results && results[0] && results[0]['winner_user_id']) {
      // winner already calculated
      return results[0]['winner_user_id'];
    }
    const users: any = await EventFactory.getInstance().getEventUsers(eventId);
    if (!users || !users.length) {
      throw ServiceError.getError(
        'EVENT_DO_NOT_HAVE_USERS',
        'Event do not have any users'
      );
    }
    // calculating winner randomly
    const winnerUser: any =
      users[Math.floor(Math.random() * users.length)]['user_id'];
    // setting winner
    EventFactory.getInstance().setEventWinner(eventId, winnerUser);
    return winnerUser;
  }

  // TODO -- check if event's winner is calculated if yes push that to list else calculate it
  static async getLastWeekWinners(): Promise<void> {
    const events: any = await EventFactory.getInstance().getLastWeekEvents();
    if (!events || !events.length) {
      throw ServiceError.getError(
        'NO_EVENT_LAST_WEEK',
        'No events completed in last week'
      );
    }
    const usersPromises: any = [];
    // Getting users for all events
    for (let index = 0; index < events.length; index++) {
      const eventId = (events[index] && events[index]['event_id']) || 0;
      const winnerUserId =
        (events[index] && events[index]['winner_user_id']) || 0;
      if (eventId && !winnerUserId)
        usersPromises.push(EventFactory.getInstance().getEventUsers(eventId));
      // pushing winnerUserId just to maintain order of events
      else if (eventId && winnerUserId) usersPromises.push([winnerUserId]);
      else {
        // Throwing internal server error in this case... this will make sure size of events array and users array will be same
        // and each index is consistent
        throw ServiceError.getInternalServerError();
      }
    }

    const users: any = await Promise.all(usersPromises);

    const winners: any = [];
    const setWinnersPromises: any = [];
    for (let index = 0; users && index < users.length; index++) {
      if (!users[index] || !users[index].length) {
        // this event has ended but have no users
        winners.push(-1);
        continue;
      }
      // checking if winner was already calculated
      const winnerUserId =
        (events[index] && events[index]['winner_user_id']) || 0;
      if (winnerUserId) {
        winners.push(winnerUserId);
        continue;
      }
      // calculating winner randomly
      const winnerUser: any =
        users[index][Math.floor(Math.random() * users[index].length)][
          'user_id'
        ];

      // setting winner
      const eventId = (events[index] && events[index]['event_id']) || 0;
      if (eventId)
        setWinnersPromises.push(
          EventFactory.getInstance().setEventWinner(eventId, winnerUser)
        );
      winners.push(winnerUser);
    }
    await Promise.all(setWinnersPromises);

    return winners;
  }
}

export default EventService;

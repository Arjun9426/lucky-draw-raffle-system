import EventService from '../Service/EventService';

class EventController {
  static async createEvent(request: any, res: any, next: any): Promise<void> {
    try {
      const response: any = await EventService.createEvent(request.body);
      res.send(response);
    } catch (e) {
      return next(e);
    }
  }

  static async joinEvent(request: any, res: any, next: any): Promise<void> {
    try {
      const response: any = await EventService.joinEvent(request.body);
      res.send(response);
    } catch (e) {
      return next(e);
    }
  }

  static async getNextEvent(request: any, res: any, next: any): Promise<void> {
    try {
      const response: any = await EventService.getNextEvent();
      res.send(response);
    } catch (e) {
      return next(e);
    }
  }

  static async getEventWinner(
    request: any,
    res: any,
    next: any
  ): Promise<void> {
    const eventId: any = request.params.eventId || 0;
    try {
      const response: any = await EventService.createEvent(eventId);
      res.send(response);
    } catch (e) {
      return next(e);
    }
  }

  static async getLastWeekWinners(
    request: any,
    res: any,
    next: any
  ): Promise<void> {
    try {
      const response: any = await EventService.getLastWeekWinners();
      res.send(response);
    } catch (e) {
      return next(e);
    }
  }
}

export default EventController;

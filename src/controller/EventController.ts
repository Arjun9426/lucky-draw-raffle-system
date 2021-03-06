import ResponseUtil from '../common/utils/ResponseUtil';
import EventService from '../Service/EventService';

class EventController {
  static async createEvent(request: any, res: any, next: any): Promise<void> {
    try {
      const response: any = await EventService.createEvent(request.body);
      console.log(response);
      ResponseUtil.sendSuccessResponse(res, response);
    } catch (e) {
      return next(e);
    }
  }

  static async joinEvent(request: any, res: any, next: any): Promise<void> {
    try {
      console.log(request.body);
      const response: any = await EventService.joinEvent(request.body);

      ResponseUtil.sendSuccessResponse(res, response);
    } catch (e) {
      return next(e);
    }
  }

  static async getNextEvent(request: any, res: any, next: any): Promise<void> {
    try {
      const response: any = await EventService.getNextEvent();

      ResponseUtil.sendSuccessResponse(res, response);
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
      const response: any = await EventService.getWinner(eventId);

      ResponseUtil.sendSuccessResponse(res, response);
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

      ResponseUtil.sendSuccessResponse(res, response);
    } catch (e) {
      return next(e);
    }
  }
}

export default EventController;

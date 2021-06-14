export default class ServiceError {
  private name: string;
  private message: any;
  constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }
  public static getError(name: any, message: any) {
    return new ServiceError(name, message);
  }

  public static getInternalServerError() {
    return new ServiceError('INTERNAL_SERVER_ERROR', 'Something went wrong :(');
  }

  public getName(): string {
    return this.name;
  }

  public getMessage(): string {
    return this.message;
  }
}

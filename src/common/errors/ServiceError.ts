export default class ServiceError {
  private name: any;
  private message: any;
  constructor(name: any, message: any) {
    this.name = name;
    this.message = message;
  }
  public static getError(name: any, message: any) {
    return new ServiceError(name, message);
  }
}

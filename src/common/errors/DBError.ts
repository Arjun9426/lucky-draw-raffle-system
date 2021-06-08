export default class DBError {
  private name: any;
  private message: any;
  constructor(name: any, message: any) {
    this.name = name;
    this.message = message;
  }
  public getError(name: any, message: any) {
    return new DBError(name, message);
  }
}

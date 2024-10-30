export class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static userAlreadyExist(message = "User already exists") {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(message = "Invalid username or password.") {
    return new CustomErrorHandler(401, message);
  }

  static unAuthorized(message = "unAuthorized.") {
    return new CustomErrorHandler(401, message);
  }

  static notFound(message = "Not Found.") {
    return new CustomErrorHandler(404, message);
  }

  static invalidInput(message = "Input is not valid") {
    return new CustomErrorHandler(400, message);
  }
}

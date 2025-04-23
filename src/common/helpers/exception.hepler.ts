import { statusCodes } from "./status-code.helper";

export class BadRequestException extends Error {
  public statusCode: number;

  constructor(message = `BadRequestException`) {
    super(message);
    this.statusCode = statusCodes.BAD_REQUEST;
  }
}

export class UnAuthorizedException extends Error {
  public statusCode: number;

  constructor(message = `UnAuthorizedException`) {
    super(message);
    this.statusCode = statusCodes.UNAUTHORIZED;
  }
}

export class ForbiddenException extends Error {
  public statusCode: number;

  constructor(message = `ForbiddenException`) {
    super(message);
    this.statusCode = statusCodes.FORBIDDEN;
  }
}

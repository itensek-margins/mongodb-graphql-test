/**
 * Custom exception classes for project-specific exceptions.
 * TODO Replace the "ProjectAbbrv" with your project's name.
 */

import { getException } from './metadata.exception';
import { ExceptionName } from '../constants/exception-name';

export interface IExceptionInfo extends Object {
  status: string;
  code: string;
  detail: string;
}

export abstract class TestProjectException extends Error {
  public exceptionName: ExceptionName;
  public exceptionInfo: IExceptionInfo;

  constructor(exceptionName: ExceptionName, message: string) {
    super();
    this.exceptionName = exceptionName;
    this.exceptionInfo = getException(exceptionName);
    this.exceptionInfo.detail = message;
  }

  public toString = (): string => {
    return `${this.exceptionName} exception:\n${this.exceptionInfo}`;
  };
}

export class TestProjectNotFoundException extends TestProjectException {
  constructor(message: string) {
    super(ExceptionName.NOT_FOUND, message);
  }
}

export class TestProjectConflictException extends TestProjectException {
  constructor(message: string) {
    super(ExceptionName.CONFLICT, message);
  }
}

export class TestProjectForbiddenException extends TestProjectException {
  constructor(message: string) {
    super(ExceptionName.FORBIDDEN, message);
  }
}

export class TestProjectValidationException extends TestProjectException {
  constructor(message: string) {
    super(ExceptionName.VALIDATION_FAILED, message);
  }
}

export class TestProjectInternalException extends TestProjectException {
  constructor(message: string) {
    super(ExceptionName.INTERNAL_EXCEPTION, message);
  }
}

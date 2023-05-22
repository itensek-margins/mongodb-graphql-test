/**
 * Metadata for project-specific exceptions.
 * Includes status code, error code, and default error message.
 * TODO Replace the "PROJECT_ABBRV" with your project's name.
 */

import { ExceptionName } from '../constants/exception-name';

const EXCEPTION_PREFIX = 'PROJECT_ABBRV';

export interface IExceptionInfo extends Object {
  status: string;
  code: string;
  detail: string;
}

const exceptionMetadata: Record<ExceptionName, IExceptionInfo> = {
  INTERNAL_EXCEPTION: {
    status: '500',
    code: '0001',
    detail: 'Internal server exception',
  },
  INCORRECT_SIGNIN: {
    status: '401',
    code: '0002',
    detail: 'Incorrect credentials',
  },
  VALIDATION_FAILED: {
    status: '400',
    code: '0003',
    detail: 'Input validation failed',
  },
  FORBIDDEN: {
    status: '409',
    code: '0004',
    detail: 'You are not authorized for this action',
  },
  NOT_FOUND: {
    status: '404',
    code: '0005',
    detail: 'Entity could not be found',
  },
  ALREADY_EXISTS: {
    status: '409',
    code: '0006',
    detail: 'Entity already exists',
  },
  CONFLICT: {
    status: '409',
    code: '0007',
    detail: 'A request could not be processed due to a conflict',
  },
};

export const getException = (name: ExceptionName, detail?: string) => {
  const exception: IExceptionInfo = Object.assign(
    {},
    exceptionMetadata[name] ?? exceptionMetadata.INTERNAL_EXCEPTION,
  );

  exception.code = `${EXCEPTION_PREFIX}-${exception.code}`;

  return Object.assign(exception, detail ? { detail: detail } : undefined);
};

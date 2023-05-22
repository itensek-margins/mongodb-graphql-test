import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { MONGO_ERROR_MAP } from './mongoose-errors';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
  InternalServerErrorException,
  LoggerService
} from '@nestjs/common';

import { Response } from 'express';

import {
  TestProjectException,
} from './custom.exception';
import { IExceptionData } from './exception-data.interface';
import { ExceptionOrigin } from '../constants/exception-origin';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {}

  /**
   * Handles Mongo exceptions.
   * Remaps Mongo exceptions to project-specific exceptions.
   */
  private mongoExceptionHandler(exception: any): IExceptionData {
    this.logger.error(exception.toString());

    let handler = MONGO_ERROR_MAP.get(exception.code);

    if (!handler) {
      handler = new InternalServerErrorException(
        'Something went wrong, please try again'
      );
    }

    return this.projectAbbrvErrorHandler(handler());
  }

  /**
   * Handles ProjectAbbrvError exceptions.
   * TODO Replace the "ProjectAbbrv" with your project's name.
   */
  private projectAbbrvErrorHandler(
    exception: TestProjectException
  ): IExceptionData {
    return {
      origin: ExceptionOrigin.TestProject,
      statusCode: +exception.exceptionInfo.status,
      code: exception.exceptionInfo.code,
      title: exception.exceptionName,
      message: exception.exceptionInfo.detail
    };
  }

  /**
   * Handles HTTP exceptions.
   */
  private httpExceptionHandler(exception: HttpException): IExceptionData {
    return {
      origin: ExceptionOrigin.Http,
      statusCode: exception.getStatus(),
      code: 'HTTP-0000',
      title: exception.getResponse()['error'] || 'Internal Server Exception',
      message: exception.getResponse()['message'] || 'Something went wrong'
    };
  }

  /**
   * Custom exception filter for the entire application.
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // In cases when error is not handled, return Internal Server Exception as a default
    let data: IExceptionData = {
      origin: ExceptionOrigin.Unknown,
      statusCode: 500,
      code: '000',
      title: 'Internal Server Exception',
      message: 'Something went wrong'
    };

    // Handle Project-specific Exceptions
    // TODO Handle via map
    if (exception instanceof TestProjectException) {
      data = this.projectAbbrvErrorHandler(exception);
    }

    // Handle HTTP Exceptions
    if (exception instanceof HttpException) {
      data = this.httpExceptionHandler(exception);
    }

    // Handle Mongo Exceptions
    if (exception.constructor.name === 'MongoServerError') {
      data = this.mongoExceptionHandler(exception);
    }

    this.logger.error('An exception occurred:');
    this.logger.error(exception.toString());

    response.status(data.statusCode).json(data);

    return response;
  }
}

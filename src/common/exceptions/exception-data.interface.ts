import { ExceptionOrigin } from '../constants/exception-origin';

export interface IExceptionData {
  origin: ExceptionOrigin;
  statusCode: number;
  code: string;
  title: string;
  message: string;
}

import {
    TestProjectConflictException,
    TestProjectInternalException,
  } from './custom.exception';
  
  // Error map based on error code
  export const MONGO_ERROR_MAP = new Map<string | number, any>([
    [
      11000,
      (err: any) =>
        new TestProjectConflictException('This record already exists.')
    ],
    [
      112,
      (err: any) =>
        new TestProjectConflictException(
          'Could not process the request, please try again.'
        )
    ],
    [
      211,
      (err: any) =>
        new TestProjectInternalException(
          'Something went wrong, please try again later.'
        )
    ],
    [
      11600,
      (err: any) =>
        new TestProjectInternalException(
          'Something went wrong, please try again later.'
        )
    ]
  ]);
  
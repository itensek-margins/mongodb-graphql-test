import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { TestProjectValidationException } from './common/exceptions/custom.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(<string>process.env.ROUTE_PREFIX);

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const defaultMsg = 'Validation failed. Please try again';
        let msg: string | undefined;
        let errors = validationErrors;

        while (errors.length) {
          if ((errors[0].children.length ?? 0) > 0) {
            errors = errors[0].children ?? [];
          } else {
            msg = Object.values(errors[0].constraints ?? [])[0];
            break;
          }
        }

        return new TestProjectValidationException(msg ?? defaultMsg);
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

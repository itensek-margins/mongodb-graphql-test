import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/exceptions/filter.exception';
import { RootConfig } from './common/config/env.validation';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import * as winston from 'winston';
import { WinstonModule, utilities as winstonUtilities } from 'nest-winston';
import { StatusMonitorModule } from 'nestjs-status-monitor';
import { EmployeeModule } from './modules/employee/employee.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'src/schema.gql',
  }), 
  TypedConfigModule.forRoot({
    schema: RootConfig,
    load: dotenvLoader({ separator: '_' })
  }),

  // Status Monitor
  StatusMonitorModule.forRoot(),

  // Logger
  WinstonModule.forRoot({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp({ format: 'DD/MM/YYYY HH:MM:SS' }),
          winstonUtilities.format.nestLike('JHLA', {
            colors: true,
            prettyPrint: true
          })
        )
      })
    ]
  }),
    MongooseModule.forRoot(<string>process.env.DB_URI, {
      retryAttempts: 3,
      retryDelay: 500,
    }),
    // modules
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    }
  ],
})
export class AppModule {}

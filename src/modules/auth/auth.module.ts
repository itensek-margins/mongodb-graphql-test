import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmployeeModule } from '../employee/employee.module';
import { AuthService } from './service/auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtConfig, RootConfig } from 'src/common/config/env.validation';
import { AbstractAuthService } from './abstract/auth.abstract.service';
import { EmployeeService } from '../employee/service/employee.service';

@Module({
  imports: [
    EmployeeModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<RootConfig>) => {
        const jwtConfig: JwtConfig = configService.get<JwtConfig>('jwt');
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRATION },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    {
      provide: AbstractAuthService,
      useExisting: AuthService,
    },
    EmployeeService,
  ],
  exports: [AbstractAuthService],
})
export class AuthModule {}

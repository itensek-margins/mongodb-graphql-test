import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmployeeModule } from '../employee/employee.module';
import { AuthService } from './service/auth.service';
import { JwtConfig, RootConfig } from 'src/common/config/env.validation';

@Module({
  imports: [
    EmployeeModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<RootConfig>) => {
        const jwtConfig: JwtConfig = configService.get<JwtConfig>('jwt');
        return {
          secret: jwtConfig.JWT_SECRET,
          signOptions: { expiresIn: jwtConfig.JWT_EXPIRATION },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

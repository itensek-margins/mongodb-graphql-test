import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeModule } from '../employee/employee.module';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    EmployeeModule,
    JwtModule.registerAsync({
      imports: [],
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

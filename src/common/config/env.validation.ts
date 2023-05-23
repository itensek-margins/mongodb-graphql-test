import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Environment } from '../constants/env';

export class AppConfig {
  @IsNumber()
  PORT!: number;

  @IsEnum(Environment)
  NODE_ENV!: Environment;

  @IsString()
  ROUTE_PREFIX!: string;

  @IsString()
  PROJECT_VERSION!: string;
}

export class DbConfig {
  @IsString()
  public readonly DB_URI!: string;

  @IsString()
  public readonly SECRET_KEY!: string;
}

export class RootConfig {
  @Type(() => AppConfig)
  @ValidateNested()
  public readonly application!: AppConfig;

  @Type(() => DbConfig)
  @ValidateNested()
  public readonly database!: DbConfig;
}

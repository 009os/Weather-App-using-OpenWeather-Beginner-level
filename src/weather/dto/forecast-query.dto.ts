import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum Units {
  METRIC = 'metric',
  IMPERIAL = 'imperial',
  KELVIN = 'kelvin',
}

export class ForecastQueryDto {
  @ApiProperty({
    description: 'City name',
    example: 'London',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiPropertyOptional({
    description: 'Country code (ISO 3166)',
    example: 'GB',
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({
    description: 'Number of days for forecast (1-5)',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  @Type(() => Number)
  @IsOptional()
  days?: number = 5;

  @ApiPropertyOptional({
    description: 'Temperature units',
    enum: Units,
    example: Units.METRIC,
    default: Units.METRIC,
  })
  @IsEnum(Units)
  @IsOptional()
  units?: Units = Units.METRIC;
}

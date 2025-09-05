import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum Units {
  METRIC = 'metric',
  IMPERIAL = 'imperial',
  KELVIN = 'kelvin',
}

export class WeatherQueryDto {
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
    description: 'Temperature units',
    enum: Units,
    example: Units.METRIC,
    default: Units.METRIC,
  })
  @IsEnum(Units)
  @IsOptional()
  units?: Units = Units.METRIC;
}

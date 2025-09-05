import { ApiProperty } from '@nestjs/swagger';

export class WeatherMainDto {
  @ApiProperty({ description: 'Temperature', example: 15.5 })
  temp: number;

  @ApiProperty({ description: 'Feels like temperature', example: 14.2 })
  feels_like: number;

  @ApiProperty({ description: 'Minimum temperature', example: 12.1 })
  temp_min: number;

  @ApiProperty({ description: 'Maximum temperature', example: 18.3 })
  temp_max: number;

  @ApiProperty({ description: 'Atmospheric pressure', example: 1013 })
  pressure: number;

  @ApiProperty({ description: 'Humidity percentage', example: 65 })
  humidity: number;
}

export class WeatherDescriptionDto {
  @ApiProperty({ description: 'Weather condition ID', example: 800 })
  id: number;

  @ApiProperty({ description: 'Weather condition', example: 'Clear' })
  main: string;

  @ApiProperty({ description: 'Weather description', example: 'clear sky' })
  description: string;

  @ApiProperty({ description: 'Weather icon code', example: '01d' })
  icon: string;
}

export class WeatherWindDto {
  @ApiProperty({ description: 'Wind speed', example: 3.6 })
  speed: number;

  @ApiProperty({ description: 'Wind direction in degrees', example: 200 })
  deg: number;
}

export class WeatherCloudsDto {
  @ApiProperty({ description: 'Cloudiness percentage', example: 0 })
  all: number;
}

export class WeatherSysDto {
  @ApiProperty({ description: 'Country code', example: 'GB' })
  country: string;

  @ApiProperty({ description: 'Sunrise time (Unix timestamp)', example: 1609459200 })
  sunrise: number;

  @ApiProperty({ description: 'Sunset time (Unix timestamp)', example: 1609492800 })
  sunset: number;
}

export class WeatherResponseDto {
  @ApiProperty({ description: 'Weather data', type: WeatherMainDto })
  main: WeatherMainDto;

  @ApiProperty({ description: 'Weather conditions', type: [WeatherDescriptionDto] })
  weather: WeatherDescriptionDto[];

  @ApiProperty({ description: 'Wind information', type: WeatherWindDto })
  wind: WeatherWindDto;

  @ApiProperty({ description: 'Cloud information', type: WeatherCloudsDto })
  clouds: WeatherCloudsDto;

  @ApiProperty({ description: 'System information', type: WeatherSysDto })
  sys: WeatherSysDto;

  @ApiProperty({ description: 'City name', example: 'London' })
  name: string;

  @ApiProperty({ description: 'Response timestamp', example: 1609459200 })
  dt: number;

  @ApiProperty({ description: 'City ID', example: 2643743 })
  id: number;

  @ApiProperty({ description: 'Coordinate information' })
  coord: {
    lon: number;
    lat: number;
  };
}

import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { WeatherService } from './weather.service';
import { WeatherQueryDto, Units } from './dto/weather-query.dto';
import { WeatherResponseDto } from './dto/weather-response.dto';
import { ForecastQueryDto } from './dto/forecast-query.dto';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('current')
  @ApiOperation({
    summary: 'Get current weather by city name',
    description: 'Retrieve current weather information for a specific city',
  })
  @ApiResponse({
    status: 200,
    description: 'Current weather data retrieved successfully',
    type: WeatherResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid query parameters',
  })
  @ApiResponse({
    status: 404,
    description: 'City not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid API key',
  })
  @ApiResponse({
    status: 429,
    description: 'API rate limit exceeded',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getCurrentWeather(@Query() query: WeatherQueryDto): Promise<WeatherResponseDto> {
    return this.weatherService.getCurrentWeather(query);
  }

  @Get('current/coordinates')
  @ApiOperation({
    summary: 'Get current weather by coordinates',
    description: 'Retrieve current weather information using latitude and longitude',
  })
  @ApiQuery({
    name: 'lat',
    description: 'Latitude',
    example: 51.5074,
    type: Number,
  })
  @ApiQuery({
    name: 'lon',
    description: 'Longitude',
    example: -0.1278,
    type: Number,
  })
  @ApiQuery({
    name: 'units',
    description: 'Temperature units',
    enum: Units,
    example: Units.METRIC,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Current weather data retrieved successfully',
    type: WeatherResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid coordinates',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid API key',
  })
  async getWeatherByCoordinates(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('units') units: Units = Units.METRIC,
  ): Promise<WeatherResponseDto> {
    if (!lat || !lon) {
      throw new HttpException(
        'Latitude and longitude are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (lat < -90 || lat > 90) {
      throw new HttpException(
        'Latitude must be between -90 and 90',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (lon < -180 || lon > 180) {
      throw new HttpException(
        'Longitude must be between -180 and 180',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.weatherService.getWeatherByCoordinates(lat, lon, units);
  }

  @Get('forecast')
  @ApiOperation({
    summary: 'Get weather forecast by city name',
    description: 'Retrieve weather forecast for a specific city (1-5 days)',
  })
  @ApiResponse({
    status: 200,
    description: 'Weather forecast retrieved successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid query parameters',
  })
  @ApiResponse({
    status: 404,
    description: 'City not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid API key',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getWeatherForecast(@Query() query: ForecastQueryDto): Promise<any> {
    return this.weatherService.getWeatherForecast(query);
  }

  @Get('health')
  @ApiOperation({
    summary: 'Health check endpoint',
    description: 'Check if the weather service is running and API key is configured',
  })
  @ApiResponse({
    status: 200,
    description: 'Service is healthy',
  })
  @ApiResponse({
    status: 500,
    description: 'Service is unhealthy',
  })
  async healthCheck(): Promise<{ status: string; message: string }> {
    try {
      // Try to make a simple API call to verify the service is working
      await this.weatherService.getCurrentWeather({
        city: 'London',
        units: Units.METRIC,
      });
      
      return {
        status: 'healthy',
        message: 'Weather service is running and API key is valid',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'unhealthy',
          message: 'Weather service is not responding properly',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

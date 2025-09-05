import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { WeatherQueryDto, Units } from './dto/weather-query.dto';
import { WeatherResponseDto } from './dto/weather-response.dto';
import { ForecastQueryDto } from './dto/forecast-query.dto';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENWEATHER_API_KEY');
    this.baseUrl = this.configService.get<string>('OPENWEATHER_BASE_URL');
    
    if (!this.apiKey) {
      throw new Error('OPENWEATHER_API_KEY is not configured');
    }
  }

  async getCurrentWeather(query: WeatherQueryDto): Promise<WeatherResponseDto> {
    try {
      const { city, country, units = Units.METRIC } = query;
      
      // Build query string
      let queryString = `q=${city}`;
      if (country) {
        queryString += `,${country}`;
      }
      
      const url = `${this.baseUrl}/weather?${queryString}&appid=${this.apiKey}&units=${units}`;
      
      const response: AxiosResponse<WeatherResponseDto> = await axios.get(url);
      
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException(
          'City not found. Please check the city name and country code.',
          HttpStatus.NOT_FOUND,
        );
      } else if (error.response?.status === 401) {
        throw new HttpException(
          'Invalid API key. Please check your OpenWeather API key.',
          HttpStatus.UNAUTHORIZED,
        );
      } else if (error.response?.status === 429) {
        throw new HttpException(
          'API rate limit exceeded. Please try again later.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      } else {
        throw new HttpException(
          'Failed to fetch weather data. Please try again later.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getWeatherByCoordinates(lat: number, lon: number, units: Units = Units.METRIC): Promise<WeatherResponseDto> {
    try {
      const url = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${units}`;
      
      const response: AxiosResponse<WeatherResponseDto> = await axios.get(url);
      
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new HttpException(
          'Invalid coordinates provided.',
          HttpStatus.BAD_REQUEST,
        );
      } else if (error.response?.status === 401) {
        throw new HttpException(
          'Invalid API key. Please check your OpenWeather API key.',
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        throw new HttpException(
          'Failed to fetch weather data. Please try again later.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getWeatherForecast(query: ForecastQueryDto): Promise<any> {
    try {
      const { city, country, days = 5, units = Units.METRIC } = query;
      
      // Build query string
      let queryString = `q=${city}`;
      if (country) {
        queryString += `,${country}`;
      }
      
      const url = `${this.baseUrl}/forecast?${queryString}&appid=${this.apiKey}&units=${units}&cnt=${days * 8}`; // 8 forecasts per day (every 3 hours)
      
      const response: AxiosResponse<any> = await axios.get(url);
      
      // Group forecasts by date
      const groupedForecasts = this.groupForecastsByDate(response.data.list, days);
      
      return {
        city: response.data.city,
        forecasts: groupedForecasts,
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException(
          'City not found. Please check the city name and country code.',
          HttpStatus.NOT_FOUND,
        );
      } else if (error.response?.status === 401) {
        throw new HttpException(
          'Invalid API key. Please check your OpenWeather API key.',
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        throw new HttpException(
          'Failed to fetch weather forecast. Please try again later.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  private groupForecastsByDate(forecasts: any[], days: number): any[] {
    const grouped: { [key: string]: any[] } = {};
    
    forecasts.forEach(forecast => {
      const date = new Date(forecast.dt * 1000).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(forecast);
    });
    
    // Convert to array and limit to requested days
    return Object.entries(grouped)
      .slice(0, days)
      .map(([date, forecasts]) => ({
        date,
        forecasts: forecasts.map(f => ({
          time: new Date(f.dt * 1000).toTimeString().split(' ')[0],
          main: f.main,
          weather: f.weather,
          wind: f.wind,
          clouds: f.clouds,
        })),
      }));
  }
}

# Weather API - NestJS & OpenWeather

A beginner-level weather API built with NestJS and OpenWeather API. This project provides RESTful endpoints to fetch current weather data and forecasts for any city worldwide.

## 🌟 Features

- **Current Weather**: Get real-time weather data for any city
- **Weather by Coordinates**: Get weather data using latitude and longitude
- **Weather Forecast**: Get 1-5 day weather forecast
- **Multiple Units**: Support for metric, imperial, and kelvin units
- **Swagger Documentation**: Interactive API documentation
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Proper error responses and status codes
- **Health Check**: Service health monitoring endpoint

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenWeather API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Weather-App-using-OpenWeather-Beginner-level
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file and add your OpenWeather API key:
   ```env
   OPENWEATHER_API_KEY=your_actual_api_key_here
   OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

5. **Access the API**
   - API Base URL: `http://localhost:3000`
   - Swagger Documentation: `http://localhost:3000/api`
   - Health Check: `http://localhost:3000/weather/health`

## 📚 API Endpoints

### Current Weather

#### Get weather by city name
```http
GET /weather/current?city=London&country=GB&units=metric
```

**Query Parameters:**
- `city` (required): City name
- `country` (optional): Country code (ISO 3166)
- `units` (optional): Temperature units (`metric`, `imperial`, `kelvin`)

#### Get weather by coordinates
```http
GET /weather/current/coordinates?lat=51.5074&lon=-0.1278&units=metric
```

**Query Parameters:**
- `lat` (required): Latitude (-90 to 90)
- `lon` (required): Longitude (-180 to 180)
- `units` (optional): Temperature units

### Weather Forecast

#### Get weather forecast
```http
GET /weather/forecast?city=London&country=GB&days=5&units=metric
```

**Query Parameters:**
- `city` (required): City name
- `country` (optional): Country code
- `days` (optional): Number of days (1-5, default: 5)
- `units` (optional): Temperature units

### Health Check

#### Check service health
```http
GET /weather/health
```

## 📖 Example Responses

### Current Weather Response
```json
{
  "main": {
    "temp": 15.5,
    "feels_like": 14.2,
    "temp_min": 12.1,
    "temp_max": 18.3,
    "pressure": 1013,
    "humidity": 65
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "wind": {
    "speed": 3.6,
    "deg": 200
  },
  "clouds": {
    "all": 0
  },
  "sys": {
    "country": "GB",
    "sunrise": 1609459200,
    "sunset": 1609492800
  },
  "name": "London",
  "dt": 1609459200,
  "id": 2643743,
  "coord": {
    "lon": -0.1278,
    "lat": 51.5074
  }
}
```

## 🛠️ Development

### Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:debug` - Start in debug mode
- `npm run build` - Build the application
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Project Structure

```
src/
├── weather/
│   ├── dto/
│   │   ├── weather-query.dto.ts
│   │   ├── weather-response.dto.ts
│   │   └── forecast-query.dto.ts
│   ├── weather.controller.ts
│   ├── weather.service.ts
│   └── weather.module.ts
├── app.module.ts
└── main.ts
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENWEATHER_API_KEY` | Your OpenWeather API key | Required |
| `OPENWEATHER_BASE_URL` | OpenWeather API base URL | `https://api.openweathermap.org/data/2.5` |
| `PORT` | Application port | `3000` |
| `NODE_ENV` | Environment | `development` |

### Getting OpenWeather API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API keys section
4. Copy your API key
5. Add it to your `.env` file

## 🚨 Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid parameters
- **401 Unauthorized**: Invalid API key
- **404 Not Found**: City not found
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

## 📝 API Documentation

Once the server is running, visit `http://localhost:3000/api` to access the interactive Swagger documentation where you can:

- Test all endpoints
- View request/response schemas
- See example requests and responses
- Try different parameters

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check that your OpenWeather API key is valid
2. Ensure all required environment variables are set
3. Check the health endpoint: `GET /weather/health`
4. Review the logs for error messages

## 🎯 Next Steps

This is a beginner-level project. Consider adding:

- Caching for better performance
- Rate limiting
- Database integration
- User authentication
- More weather data endpoints
- Weather alerts
- Historical weather data
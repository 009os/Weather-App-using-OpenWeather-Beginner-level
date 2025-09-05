# Weather API

Simple weather API built with NestJS and OpenWeather API.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Get API key**
   - Go to [openweathermap.org/api](https://openweathermap.org/api)
   - Sign up for free
   - Copy your API key

3. **Add API key**
   ```bash
   cp env.example .env
   # Edit .env and add your API key
   ```

4. **Start server**
   ```bash
   npm run start:dev
   ```

## Usage

- **API**: `http://localhost:3000`
- **Docs**: `http://localhost:3000/api`

### Endpoints

- `GET /weather/current?city=London` - Current weather
- `GET /weather/forecast?city=London&days=5` - 5-day forecast
- `GET /weather/health` - Health check

## Example

```bash
curl "http://localhost:3000/weather/current?city=London"
```

That's it! 🌤️
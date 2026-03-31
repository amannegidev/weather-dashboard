import axios from 'axios';

// Cache utility
const CACHE_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

const getCacheKey = (url, params) => btoa(JSON.stringify({ url, params }));

const getCachedData = (key) => {
  const cached = localStorage.getItem(key);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
      return data;
    } else {
      localStorage.removeItem(key);
    }
  }
  return null;
};

const setCachedData = (key, data) => {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

// Base URLs for Open-Meteo APIs
const WEATHER_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const AIR_QUALITY_BASE_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';
const ARCHIVE_BASE_URL = 'https://archive-api.open-meteo.com/v1/archive';

const fetchCurrentWeather = async (lat, lng, date) => {
  const params = {
    latitude: lat,
    longitude: lng,
    current: 'temperature_2m,relative_humidity_2m,precipitation,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index',
    hourly: 'temperature_2m,relative_humidity_2m,precipitation,weather_code,visibility,wind_speed_10m,pm10,pm2_5',
    daily: 'sunrise,sunset,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,uv_index_max,wind_speed_10m_max',
    timezone: 'auto',
    start_date: date,
    end_date: date,
  };
  const cacheKey = getCacheKey(WEATHER_BASE_URL, params);
  let data = getCachedData(cacheKey);
  if (!data) {
    const response = await axios.get(WEATHER_BASE_URL, { params });
    data = response.data;
    setCachedData(cacheKey, data);
  }
  return data;
};

const fetchAirQualityRange = async (lat, lng, startDate, endDate) => {
  const params = {
    latitude: lat,
    longitude: lng,
    hourly: 'pm10,pm2_5',
    timezone: 'auto',
    start_date: startDate,
    end_date: endDate,
  };
  const cacheKey = getCacheKey(AIR_QUALITY_BASE_URL, params);
  let data = getCachedData(cacheKey);
  if (!data) {
    const response = await axios.get(AIR_QUALITY_BASE_URL, { params });
    data = response.data;
    setCachedData(cacheKey, data);
  }
  return data;
};

const fetchAirQuality = async (lat, lng, date) => {
  const params = {
    latitude: lat,
    longitude: lng,
    current: 'european_aqi,pm10,pm2_5,carbon_monoxide,carbon_dioxide,nitrogen_dioxide,sulphur_dioxide',
    hourly: 'european_aqi,pm10,pm2_5,carbon_monoxide,carbon_dioxide,nitrogen_dioxide,sulphur_dioxide',
    timezone: 'auto',
    start_date: date,
    end_date: date,
  };
  const cacheKey = getCacheKey(AIR_QUALITY_BASE_URL, params);
  let data = getCachedData(cacheKey);
  if (!data) {
    const response = await axios.get(AIR_QUALITY_BASE_URL, { params });
    data = response.data;
    setCachedData(cacheKey, data);
  }
  return data;
};

const fetchHistoricalData = async (lat, lng, startDate, endDate) => {
  const params = {
    latitude: lat,
    longitude: lng,
    start_date: startDate,
    end_date: endDate,
    hourly: 'temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m',
    daily: 'temperature_2m_mean,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant',
    timezone: 'auto',
  };
  const cacheKey = getCacheKey(ARCHIVE_BASE_URL, params);
  let data = getCachedData(cacheKey);
  if (!data) {
    const response = await axios.get(ARCHIVE_BASE_URL, { params });
    data = response.data;
    setCachedData(cacheKey, data);
  }
  return data;
};

export { fetchCurrentWeather, fetchAirQuality, fetchAirQualityRange, fetchHistoricalData };

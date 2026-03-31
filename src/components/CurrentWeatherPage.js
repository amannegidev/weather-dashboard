import { useState, useEffect, useMemo } from 'react';
import {
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Thermometer,
  CloudRain,
  Sunrise,
  Wind,
  Droplets,
  Gauge
} from 'lucide-react';

import useGPS from '../hooks/useGPS';
import { fetchCurrentWeather, fetchAirQuality } from '../services/weatherService';
import HourlyGraphs from './HourlyGraphs';

const CurrentWeatherPage = () => {
  const { location, error: gpsError, loading: gpsLoading } = useGPS();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const dateString = useMemo(
    () => selectedDate.toISOString().split('T')[0],
    [selectedDate]
  );

  useEffect(() => {
    if (location.latitude && location.longitude) {
      setLoading(true);
      setError(null);
      Promise.all([
        fetchCurrentWeather(location.latitude, location.longitude, dateString),
        fetchAirQuality(location.latitude, location.longitude, dateString)
      ])
        .then(([weather, airQuality]) => {
          setWeatherData(weather);
          setAirQualityData(airQuality);
        })
        .catch((err) => {
          setError(err.message);
          setSnackbarOpen(true);
        })
        .finally(() => setLoading(false));
    }
  }, [location, dateString]);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  if (gpsLoading)
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <CircularProgress />
        <p className="text-sm text-gray-500 mt-3">Fetching your location...</p>
      </div>
    );

  if (gpsError)
    return <Alert severity="error" className="mt-6">{gpsError}</Alert>;

  const current = weatherData?.current;
  const daily = weatherData?.daily;
  const dayIndex = 0;
  const airCurrent = airQualityData?.current;

  const formatNumber = (v, suffix = '') =>
    typeof v === 'number' && Number.isFinite(v) ? `${v}${suffix}` : '—';

  const formatTime = (isoString) => {
    if (!isoString) return '—';
    const d = new Date(isoString);
    return Number.isNaN(d.getTime()) ? '—' : d.toLocaleTimeString();
  };

  const card = "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300";

  const CardHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-3">
      <Icon size={18} className="text-red-400" />
      <span className="text-xs font-bold uppercase tracking-widest">
        {title}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen p-4 sm:p-8 space-y-6 ">

      {/* Header */}
      <div className=" rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6 text-white shadow-2xl border border-gray-700">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Weather Dashboard</h1>
          <p className="text-gray-300 text-sm mt-2">
            Real-time weather & hourly forecast
          </p>
        </div>

        <div className="sm:ml-auto w-full sm:w-auto">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-medium">Select Date</p>
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            dateFormat="yyyy-MM-dd"
            className="w-full sm:w-56 px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 bg-white bg-opacity-95 text-gray-900 placeholder-gray-400"
          />
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <CircularProgress />
        </div>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {weatherData && airQualityData && (
        <>
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* Temperature */}
            <div className={card}>
              <CardHeader icon={Thermometer} title="Temperature" />
              <h2 className="text-5xl font-bold text-white">
                {formatNumber(current?.temperature_2m, '°C')}
              </h2>
              <div className="flex justify-between mt-4 text-sm font-medium text-gray-300 pt-3 border-t border-gray-700">
                <span className="text-red-400">↓ {formatNumber(daily?.temperature_2m_min?.[dayIndex], '°C')}</span>
                <span className="text-orange-400">↑ {formatNumber(daily?.temperature_2m_max?.[dayIndex], '°C')}</span>
              </div>
            </div>

            {/* Precipitation */}
            <div className={card}>
              <CardHeader icon={CloudRain} title="Precipitation" />
              <h2 className="text-5xl font-bold text-white">
                {formatNumber(daily?.precipitation_sum?.[dayIndex], '')}
                <span className="text-lg font-semibold text-gray-400"> mm</span>
              </h2>
              <p className="text-xs text-gray-400 mt-3 uppercase tracking-wider">Daily total</p>
            </div>

            {/* Sunrise/Sunset */}
            <div className={card}>
              <CardHeader icon={Sunrise} title="Sunrise / Sunset" />
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg">🌅</span>
                  <span className="text-2xl font-bold text-orange-400">{formatTime(daily?.sunrise?.[dayIndex])}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg">🌇</span>
                  <span className="text-2xl font-bold text-indigo-400">{formatTime(daily?.sunset?.[dayIndex])}</span>
                </div>
              </div>
            </div>

            {/* Wind */}
            <div className={card}>
              <CardHeader icon={Wind} title="Wind Speed" />
              <h2 className="text-5xl font-bold text-white">
                {formatNumber(daily?.wind_speed_10m_max?.[dayIndex], '')}
                <span className="text-lg font-semibold text-gray-400"> km/h</span>
              </h2>
              <p className="text-xs text-gray-400 mt-3 uppercase tracking-wider">Max speed</p>
            </div>

            {/* Humidity / UV */}
            <div className={card}>
              <CardHeader icon={Droplets} title="Humidity & UV" />
              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Humidity</p>
                  <p className="text-3xl font-bold text-cyan-400 mt-1">{formatNumber(current?.relative_humidity_2m, '%')}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">UV Index</p>
                  <p className="text-3xl font-bold text-yellow-400 mt-1">{formatNumber(current?.uv_index)}</p>
                </div>
              </div>
            </div>

            {/* Rain Probability */}
            <div className={card}>
              <CardHeader icon={CloudRain} title="Rain Probability" />
              <div className="flex items-center gap-3">
                <h2 className="text-5xl font-bold text-white">
                  {formatNumber(daily?.precipitation_probability_max?.[dayIndex], '')}
                </h2>
                <span className="text-2xl text-cyan-400">%</span>
              </div>
              <p className="text-xs text-gray-400 mt-3 uppercase tracking-wider">Chance of rain</p>
            </div>
          </div>

          {/* Air Quality */}
          <div className={card}>
            <CardHeader icon={Gauge} title="Air Quality Index" />
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-5xl font-bold text-white">
                {airCurrent?.european_aqi ?? '—'}
              </h2>
              <div className="text-xs">
                <p className="text-gray-400 uppercase tracking-wide font-medium">European AQI</p>
                <p className="text-gray-500 text-xs mt-1">Current level</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[
                ['PM10', airCurrent?.pm10],
                ['PM2.5', airCurrent?.pm2_5],
                ['CO', airCurrent?.carbon_monoxide],
                ['CO2', airCurrent?.carbon_dioxide],
                ['NO2', airCurrent?.nitrogen_dioxide],
                ['SO2', airCurrent?.sulphur_dioxide]
              ].map(([label, value]) => (
                <div key={label} className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-3 text-center border border-gray-600">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{label}</p>
                  <p className="text-lg font-bold text-white mt-1">{value ?? '—'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Graph */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 
            rounded-none sm:rounded-2xl 
            px-2 sm:px-6 py-4 sm:py-6 
            -ml-4 -mr-4 sm:ml-0 sm:mr-0 
            shadow-lg">
            <HourlyGraphs
              data={weatherData.hourly}
              airData={airQualityData.hourly}
            />
          </div>
        </>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CurrentWeatherPage;

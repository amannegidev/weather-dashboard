import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';

const HourlyGraphs = ({ data = {}, airData = {} }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const temperatureData = (data.temperature_2m || []).map((temp, index) => ({
    time: data.time?.[index],
    temperature: isCelsius ? temp : (temp * 9) / 5 + 32,
  }));

  const humidityData = (data.relative_humidity_2m || []).map((hum, index) => ({
    time: data.time?.[index],
    humidity: hum,
  }));

  const precipitationData = (data.precipitation || []).map((prec, index) => ({
    time: data.time?.[index],
    precipitation: prec,
  }));

  const visibilityData = (data.visibility || []).map((vis, index) => ({
    time: data.time?.[index],
    visibility: vis / 1000,
  }));

  const windSpeedData = (data.wind_speed_10m || []).map((wind, index) => ({
    time: data.time?.[index],
    windSpeed: wind,
  }));

  const pmData = airData?.time
    ? airData.time.map((time, index) => ({
        time,
        pm10: airData.pm10?.[index],
        pm25: airData.pm2_5?.[index],
      }))
    : [];

  return (
    <div className="px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Hourly Data</h2>
          <p className="text-sm text-gray-300">Detailed 24-hour forecast for selected date</p>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <span className="text-sm font-semibold text-gray-300">Units</span>
          <div className="inline-flex items-center rounded-full bg-slate-700 p-1">
            <button
              type="button"
              onClick={() => setIsCelsius(true)}
              aria-pressed={isCelsius}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${isCelsius ? 'bg-white text-slate-900' : 'text-gray-300 hover:bg-slate-600'}`}
            >
              °C
            </button>
            <button
              type="button"
              onClick={() => setIsCelsius(false)}
              aria-pressed={!isCelsius}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${!isCelsius ? 'bg-white text-slate-900' : 'text-gray-300 hover:bg-slate-600'}`}
            >
              °F
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll container: one full-width card per view on mobile, wider cards on desktop */}
      <div className="overflow-x-auto -mx-4 px-4 py-2 snap-x snap-mandatory">
        <div className="flex gap-4">
          {/* Temperature */}
          <div className="flex-shrink-0 w-[92%] sm:w-[95%] md:min-w-[900px] snap-start">
            <div className="p-4 rounded-lg border border-gray-700 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-white">Temperature Trend</h3>
              </div>
              <div className="h-72 sm:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperatureData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.2)" />
                    <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', backgroundColor: '#1f2937', color: '#f3f4f6' }} />
                    <Brush dataKey="time" height={30} stroke="#ef4444" fill="rgba(239,68,68,0.1)" />
                    <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Humidity */}
          <div className="flex-shrink-0 w-[92%] sm:w-[95%] md:min-w-[900px] snap-start">
            <div className="p-4 rounded-lg border border-gray-700 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Relative Humidity</h3>
              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={humidityData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.2)" />
                    <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', backgroundColor: '#1f2937', color: '#f3f4f6' }} />
                    <Brush dataKey="time" height={30} stroke="#10b981" fill="rgba(16,185,129,0.1)" />
                    <Line type="monotone" dataKey="humidity" stroke="#10b981" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Precipitation */}
          <div className="flex-shrink-0 w-[92%] sm:w-[95%] md:min-w-[900px] snap-start">
            <div className="p-4 rounded-lg border border-gray-700 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Precipitation (mm)</h3>
              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={precipitationData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.2)" />
                    <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', backgroundColor: '#1f2937', color: '#f3f4f6' }} />
                    <Brush dataKey="time" height={30} stroke="#f59e0b" fill="rgba(245,158,11,0.1)" />
                    <Line type="monotone" dataKey="precipitation" stroke="#f59e0b" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Visibility */}
          <div className="flex-shrink-0 w-[92%] sm:w-[95%] md:min-w-[900px] snap-start">
            <div className="p-4 rounded-lg border border-gray-700 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Visibility (km)</h3>
              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={visibilityData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.2)" />
                    <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', backgroundColor: '#1f2937', color: '#f3f4f6' }} />
                    <Brush dataKey="time" height={30} stroke="#8b5cf6" fill="rgba(139,92,246,0.1)" />
                    <Line type="monotone" dataKey="visibility" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="flex-shrink-0 w-[92%] sm:w-[95%] md:min-w-[900px] snap-start">
            <div className="p-4 rounded-lg border border-gray-700 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Wind Speed (km/h)</h3>
              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={windSpeedData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.2)" />
                    <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', backgroundColor: '#1f2937', color: '#f3f4f6' }} />
                    <Brush dataKey="time" height={30} stroke="#ec4899" fill="rgba(236,72,153,0.1)" />
                    <Line type="monotone" dataKey="windSpeed" stroke="#ec4899" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* PM */}
          <div className="flex-shrink-0 w-[92%] sm:w-[95%] md:min-w-[900px] snap-start">
            <div className="p-4 rounded-lg border border-gray-700 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-3">PM10 & PM2.5 Levels</h3>
              {pmData.length === 0 ? (
                <p className="text-gray-300 py-4">PM10/PM2.5 data not available for the selected date.</p>
              ) : (
                <div className="h-72 sm:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pmData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.2)" />
                      <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', backgroundColor: '#1f2937', color: '#f3f4f6' }} />
                      <Brush dataKey="time" height={30} stroke="#ef4444" fill="rgba(239,68,68,0.1)" />
                      <Line type="monotone" dataKey="pm10" stroke="#ef4444" strokeWidth={3} name="PM10" dot={false} />
                      <Line type="monotone" dataKey="pm25" stroke="#3b82f6" strokeWidth={3} name="PM2.5" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HourlyGraphs;

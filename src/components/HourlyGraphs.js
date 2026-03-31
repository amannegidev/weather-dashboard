import { useState } from 'react';
import { Box, Typography, Grid, FormControlLabel, Switch, Stack, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';

const HourlyGraphs = ({ data, airData }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const temperatureData = data.temperature_2m.map((temp, index) => ({
    time: data.time[index],
    temperature: isCelsius ? temp : (temp * 9 / 5) + 32,
  }));

  const humidityData = data.relative_humidity_2m.map((hum, index) => ({
    time: data.time[index],
    humidity: hum,
  }));

  const precipitationData = data.precipitation.map((prec, index) => ({
    time: data.time[index],
    precipitation: prec,
  }));

  const visibilityData = data.visibility.map((vis, index) => ({
    time: data.time[index],
    visibility: vis / 1000, // Convert to km
  }));

  const windSpeedData = data.wind_speed_10m.map((wind, index) => ({
    time: data.time[index],
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
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '1.5rem', mb: 0.5, color: '#f3f4f6' }}>Hourly Data</Typography>
          <Typography variant="body2" sx={{ color: '#d1d5db', fontSize: '0.875rem', fontWeight: 500 }}>Detailed 24-hour forecast for selected date</Typography>
        </Box>
        <Box sx={{ flex: 1 }} />
      </Stack>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: { xs: 3, sm: 3 }, borderRadius: 2, background: 'linear-gradient(135deg, rgba(31,41,55,0.9) 0%, rgba(17,24,39,0.9) 100%)', border: '1px solid rgba(107, 114, 128, 0.3)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.125rem' }, color: '#f3f4f6' }}>Temperature Trend</Typography>
              <FormControlLabel
                control={<Switch checked={isCelsius} onChange={() => setIsCelsius(!isCelsius)} />}
                label={<Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#d1d5db' }}>{isCelsius ? '°C' : '°F'}</Typography>}
              />
            </Box>
            <Box sx={{ height: { xs: 280, sm: 320 }, width: '100%' }}>
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
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, background: 'linear-gradient(135deg, rgba(31,41,55,0.9) 0%, rgba(17,24,39,0.9) 100%)', border: '1px solid rgba(107, 114, 128, 0.3)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.125rem' }, color: '#f3f4f6' }}>Relative Humidity</Typography>
            <Box sx={{ height: { xs: 250, sm: 300 }, width: '100%' }}>
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
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, background: 'linear-gradient(135deg, rgba(31,41,55,0.9) 0%, rgba(17,24,39,0.9) 100%)', border: '1px solid rgba(107, 114, 128, 0.3)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.125rem' }, color: '#f3f4f6' }}>Precipitation (mm)</Typography>
            <Box sx={{ height: { xs: 250, sm: 300 }, width: '100%' }}>
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
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, background: 'linear-gradient(135deg, rgba(31,41,55,0.9) 0%, rgba(17,24,39,0.9) 100%)', border: '1px solid rgba(107, 114, 128, 0.3)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.125rem' }, color: '#f3f4f6' }}>Visibility (km)</Typography>
            <Box sx={{ height: { xs: 250, sm: 300 }, width: '100%' }}>
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
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, background: 'linear-gradient(135deg, rgba(31,41,55,0.9) 0%, rgba(17,24,39,0.9) 100%)', border: '1px solid rgba(107, 114, 128, 0.3)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.125rem' }, color: '#f3f4f6' }}>Wind Speed (km/h)</Typography>
            <Box sx={{ height: { xs: 250, sm: 300 }, width: '100%' }}>
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
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2, background: 'linear-gradient(135deg, rgba(31,41,55,0.9) 0%, rgba(17,24,39,0.9) 100%)', border: '1px solid rgba(107, 114, 128, 0.3)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, fontSize: '1.125rem', color: '#f3f4f6' }}>PM10 & PM2.5 Levels</Typography>
            {pmData.length === 0 ? (
              <Typography sx={{ color: '#d1d5db', py: 4 }}>
                PM10/PM2.5 data not available for the selected date.
              </Typography>
            ) : (
              <Box sx={{ height: { xs: 280, sm: 300 }, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pmData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.2)" />
                    <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', backgroundColor: '#1f2937', color: '#f3f4f6' }} />
                    <Brush dataKey="time" height={30} stroke="#ef4444" fill="rgba(239,68,68,0.1)" />
                    <Line type="monotone" dataKey="pm10" stroke="#ef4444" strokeWidth={3} dot={false} name="PM10" />
                    <Line type="monotone" dataKey="pm25" stroke="#3b82f6" strokeWidth={3} dot={false} name="PM2.5" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HourlyGraphs;

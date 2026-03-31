import { Box, Typography, Grid, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, BarChart, Brush } from 'recharts';

const HistoricalGraphs = ({ data, airQualityData }) => {
  if (!data.daily || !data.daily.time) {
    return <Typography>No historical data available.</Typography>;
  }

  const panelSx = {
    p: { xs: 2, sm: 3 },
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06)',
  };

  const temperatureData = data.daily.time.map((date, index) => ({
    date,
    mean: data.daily.temperature_2m_mean[index],
    max: data.daily.temperature_2m_max[index],
    min: data.daily.temperature_2m_min[index],
  }));

  const sunriseSunsetData = data.daily.time.map((date, index) => {
    const sunriseUTC = new Date(data.daily.sunrise[index]);
    const sunsetUTC = new Date(data.daily.sunset[index]);
    const sunriseIST = new Date(sunriseUTC.getTime() + (5.5 * 60 * 60 * 1000));
    const sunsetIST = new Date(sunsetUTC.getTime() + (5.5 * 60 * 60 * 1000));
    return {
      date,
      sunrise: sunriseIST.getHours() + (sunriseIST.getMinutes() / 60),
      sunset: sunsetIST.getHours() + (sunsetIST.getMinutes() / 60),
    };
  });

  const precipitationData = data.daily.time.map((date, index) => ({
    date,
    precipitation: data.daily.precipitation_sum[index],
  }));

  const windData = data.daily.time.map((date, index) => ({
    date,
    maxWindSpeed: data.daily.wind_speed_10m_max[index],
    dominantDirection: data.daily.wind_direction_10m_dominant[index],
  }));

  const pmChartData = airQualityData?.hourly?.time
    ? airQualityData.hourly.time.map((time, index) => ({
        time,
        pm10: airQualityData.hourly.pm10?.[index],
        pm25: airQualityData.hourly.pm2_5?.[index],
      }))
    : [];

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ ...panelSx, background: 'linear-gradient(135deg, rgba(31,41,55,0.9) 0%, rgba(17,24,39,0.9) 100%)', border: '1px solid rgba(107, 114, 128, 0.3)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.125rem' }, mb: 2, color: '#f3f4f6' }}>Temperature Trends</Typography>
            <ResponsiveContainer width="100%" height={{ xs: 280, sm: 320 }}>
              <LineChart data={temperatureData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.2)" />
                <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', backgroundColor: '#1f2937', color: '#f3f4f6' }} />
                <Brush dataKey="date" height={30} stroke="#ef4444" fill="rgba(239,68,68,0.1)" />
                <Line type="monotone" dataKey="mean" stroke="#ef4444" strokeWidth={3} name="Mean" dot={false} />
                <Line type="monotone" dataKey="max" stroke="#fbbf24" strokeWidth={3} name="Max" dot={false} />
                <Line type="monotone" dataKey="min" stroke="#60a5fa" strokeWidth={2} strokeDasharray="5 5" name="Min" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ ...panelSx, background: 'linear-gradient(135deg, rgba(31,41,55,0.9) 0%, rgba(17,24,39,0.9) 100%)', border: '1px solid rgba(107, 114, 128, 0.3)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.125rem' }, mb: 2, color: '#f3f4f6' }}>Sunrise & Sunset Times</Typography>
            <ResponsiveContainer width="100%" height={{ xs: 280, sm: 320 }}>
              <LineChart data={sunriseSunsetData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.2)" />
                <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', backgroundColor: '#1f2937', color: '#f3f4f6' }} />
                <Brush dataKey="date" height={30} stroke="#f59e0b" fill="rgba(245,158,11,0.1)" />
                <Line type="monotone" dataKey="sunrise" stroke="#f59e0b" strokeWidth={3} name="Sunrise" dot={false} />
                <Line type="monotone" dataKey="sunset" stroke="#8b5cf6" strokeWidth={3} name="Sunset" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ ...panelSx, background: 'linear-gradient(135deg, rgba(31,41,55,0.9) 0%, rgba(17,24,39,0.9) 100%)', border: '1px solid rgba(107, 114, 128, 0.3)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.125rem' }, mb: 2, color: '#f3f4f6' }}>Daily Precipitation</Typography>
            <ResponsiveContainer width="100%" height={{ xs: 280, sm: 320 }}>
              <BarChart data={precipitationData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.2)" />
                <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', backgroundColor: '#1f2937', color: '#f3f4f6' }} />
                <Brush dataKey="date" height={30} stroke="#10b981" fill="rgba(16,185,129,0.1)" />
                <Bar dataKey="precipitation" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ ...panelSx, background: 'linear-gradient(135deg, rgba(31,41,55,0.9) 0%, rgba(17,24,39,0.9) 100%)', border: '1px solid rgba(107, 114, 128, 0.3)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.125rem' }, mb: 2, color: '#f3f4f6' }}>Wind Speed & Direction</Typography>
            <ResponsiveContainer width="100%" height={{ xs: 280, sm: 320 }}>
              <ComposedChart data={windData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.2)" />
                <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis yAxisId="left" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', backgroundColor: '#1f2937', color: '#f3f4f6' }} />
                <Brush dataKey="date" height={30} stroke="#ec4899" fill="rgba(236,72,153,0.1)" />
                <Bar yAxisId="left" dataKey="maxWindSpeed" fill="#ec4899" radius={[8, 8, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="dominantDirection" stroke="#06b6d4" strokeWidth={3} name="Direction" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ ...panelSx, background: 'linear-gradient(135deg, rgba(31,41,55,0.9) 0%, rgba(17,24,39,0.9) 100%)', border: '1px solid rgba(107, 114, 128, 0.3)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.125rem', mb: 2, color: '#f3f4f6' }}>Air Quality (PM10 & PM2.5)</Typography>
            {pmChartData.length === 0 ? (
              <Typography sx={{ color: '#d1d5db', py: 4 }}>
                PM10/PM2.5 data not available for the selected range.
              </Typography>
            ) : (
              <ResponsiveContainer width="100%" height={{ xs: 280, sm: 320 }}>
                <LineChart data={pmChartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.2)" />
                  <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', backgroundColor: '#1f2937', color: '#f3f4f6' }} />
                  <Brush dataKey="time" height={30} stroke="#ef4444" fill="rgba(239,68,68,0.1)" />
                  <Line type="monotone" dataKey="pm10" stroke="#ef4444" strokeWidth={3} name="PM10" dot={false} />
                  <Line type="monotone" dataKey="pm25" stroke="#f59e0b" strokeWidth={3} name="PM2.5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HistoricalGraphs;

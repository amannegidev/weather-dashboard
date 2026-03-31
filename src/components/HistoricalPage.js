import { useState } from 'react';
import { Typography, Box, CircularProgress, Button, Paper, Stack, Alert } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useGPS from '../hooks/useGPS';
import { fetchAirQualityRange, fetchHistoricalData } from '../services/weatherService';
import HistoricalGraphs from './HistoricalGraphs';

const HistoricalPage = () => {
  const { location, error: gpsError, loading: gpsLoading } = useGPS();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [historicalAirQuality, setHistoricalAirQuality] = useState(null);
  const [airQualityNotice, setAirQualityNotice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = () => {
    if (location.latitude && location.longitude && startDate && endDate) {
      const start = startDate.toISOString().split('T')[0];
      const end = endDate.toISOString().split('T')[0];
      const diffTime = Math.abs(new Date(end) - new Date(start));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 730) { // Max 2 years
        setError('Date range cannot exceed 2 years.');
        return;
      }

      const now = new Date();
      const earliestAirQuality = new Date(now.getTime() - (92 * 24 * 60 * 60 * 1000));
      const isAirQualityAvailable = startDate >= earliestAirQuality;
      setAirQualityNotice(
        isAirQualityAvailable
          ? null
          : 'PM10/PM2.5 is available only for the last 92 days (Open-Meteo Air Quality API limitation).'
      );

      setLoading(true);

      const tasks = [
        fetchHistoricalData(location.latitude, location.longitude, start, end),
        isAirQualityAvailable
          ? fetchAirQualityRange(location.latitude, location.longitude, start, end)
          : Promise.resolve(null),
      ];

      Promise.all(tasks)
        .then(([weather, airQuality]) => {
          setHistoricalData(weather);
          setHistoricalAirQuality(airQuality);
          setError(null);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  };

  if (gpsLoading) return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
  if (gpsError) return <Typography color="error">{gpsError}</Typography>;

  return (
    <Box sx={{ minHeight: '100vh', p: { xs: 2, sm: 4 }}}>
      {/* Header */}
      <Box sx={{ 
        mb: 4, 
        py: 3,
        
        borderRadius: 1,
        px: 4,
        color: 'white',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(75, 85, 99, 0.3)'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>Historical Weather</Typography>
        <Typography sx={{ fontSize: '0.925rem', color: 'rgba(209,213,219,0.9)' }}>Analyze weather patterns over time (up to 2 years)</Typography>
      </Box>

      <Paper variant="outlined" sx={{ 
        p: { xs: 3, sm: 4 }, 
        mb: 3,
        borderRadius: 2.5,
        background: 'none',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(75, 85, 99, 0.3)'
      }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems={{ xs: 'stretch', md: 'flex-end' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1 }}>Start Date</Typography>
            <Box sx={{ mt: 1.5 }}>
              <DatePicker selected={startDate} onChange={setStartDate} dateFormat="yyyy-MM-dd" className="date-picker-input-dark" />
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1 }}>End Date</Typography>
            <Box sx={{ mt: 1.5 }}>
              <DatePicker selected={endDate} onChange={setEndDate} dateFormat="yyyy-MM-dd" className="date-picker-input-dark" />
            </Box>
          </Box>
          <Box>
            <Button 
              variant="contained" 
              onClick={handleFetch} 
              disabled={!startDate || !endDate || loading}
              sx={{
                background: loading ? 'linear-gradient(135deg, #4b5563 0%, #374151 100%)' : 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
                color: 'white',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 1.5,
                textTransform: 'uppercase',
                fontSize: '0.875rem',
                letterSpacing: 0.5,
                border: '1px solid rgba(75, 85, 99, 0.5)',
                boxShadow: loading ? 'none' : '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  background: loading ? 'linear-gradient(135deg, #4b5563 0%, #374151 100%)' : 'linear-gradient(135deg, #111827 0%, #000000 100%)',
                  boxShadow: loading ? 'none' : '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Loading...' : 'Fetch Data'}
            </Button>
          </Box>
        </Stack>
      </Paper>

      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', py: 6 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
      {airQualityNotice && <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>{airQualityNotice}</Alert>}

      {historicalData && (
        <Paper variant="outlined" sx={{ 
          p: { xs: 2, sm: 3 },
          borderRadius: 2.5,
          background: 'rgba(31,41,55,0.85)',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(75, 85, 99, 0.3)'
        }}>
          <HistoricalGraphs data={historicalData} airQualityData={historicalAirQuality} />
        </Paper>
      )}
    </Box>
  );
};

export default HistoricalPage;

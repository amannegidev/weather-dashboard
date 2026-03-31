import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box, Typography } from '@mui/material';
import CurrentWeatherPage from './components/CurrentWeatherPage';
import HistoricalPage from './components/HistoricalPage';

function App() {
  return (
    <Router>
      <AppBar position="sticky" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.2 }}>
              Weather Dashboard
            </Typography>
            <Box sx={{ flex: 1 }} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button color="inherit" component={Link} to="/" sx={{ fontWeight: 600 }}>
                Current
              </Button>
              <Button color="inherit" component={Link} to="/historical" sx={{ fontWeight: 600 }}>
                Historical
              </Button>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3 } }}>
        <Routes>
          <Route path="/" element={<CurrentWeatherPage />} />
          <Route path="/historical" element={<HistoricalPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

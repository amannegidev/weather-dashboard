# Weather Dashboard 🌤️

A modern, responsive weather application that provides real-time weather data, air quality information, and historical weather analysis with beautiful interactive charts.

## Features

### 📍 Real-Time Weather
- Current temperature, conditions, and weather metrics
- Air quality index (AQI) and pollution levels
- Sunrise/sunset times and UV index
- Wind speed and direction
- Humidity and rainfall probability

### 📊 24-Hour Forecast
- Hourly weather predictions with interactive charts
- Temperature trends throughout the day
- Humidity, precipitation, visibility, and wind data
- Air quality (PM2.5/PM10) hourly breakdown

### 📈 Historical Analysis
- Query weather data up to 2 years in the past
- Date range selector with validation
- Historical temperature trends
- Precipitation patterns and wind speed analysis
- Sunrise/sunset trends over time
- Air quality data (last 92 days available)

### 🎨 Modern UI
- Dark theme with sleek gradient backgrounds
- Fully responsive design (mobile, tablet, desktop)
- Interactive cards with hover effects
- Smooth animations and transitions
- Material-UI components for consistency

### 📍 Auto-Detection
- GPS-powered location detection
- Automatic weather updates for your location
- Fallback error handling with user-friendly messages

## Technology Stack

- **Frontend**: React 19.2.4 with React Router v7.13.2
- **Styling**: Tailwind CSS with Material-UI v7.3.9
- **Charts**: Recharts v3.8.1 for data visualization
- **API**: Open-Meteo Weather API (free, no authentication required)
- **Data**: LocalStorage caching with 10-minute expiry
- **Fonts**: Google Fonts Roboto family

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/amannegidev/weather-dashboard.git
cd weather-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

The app will automatically request access to your GPS location for weather data.

## Available Scripts

### `npm start`
Runs the app in development mode with hot reload.

### `npm run build`
Creates an optimized production build in the `build/` folder.

### `npm test`
Launches the test runner in interactive watch mode.

## API Integration

The app uses the **Open-Meteo Weather API** (free tier):
- No API keys required
- Geographic location via GPS coordinates
- Current weather data
- Hourly forecast (up to 7 days)
- Historical weather data (up to 2 years)
- Air quality index (AQI) data
- Rate limiting: 10,000 calls/day

**Supported Weather Metrics:**
- Temperature (°C/°F)
- Relative humidity
- Precipitation
- Weather code & description
- Wind speed & direction
- Visibility
- UV index
- Air quality (PM2.5, PM10, NO₂, O₃)

## Important Notes

### Air Quality Data Limitations
- Historical PM2.5/PM10 data is available for the last **92 days only** (Open-Meteo API limitation)
- Real-time air quality data is available for current conditions
- The app displays a warning if historical date range exceeds this window

### Location Privacy
- GPS location is requested only when needed
- Location data is not stored or transmitted to external servers
- Geolocation fails gracefully with error messages

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub (already done!)
2. Go to [https://vercel.com](https://vercel.com)
3. Click **"New Project"** → **Import Git Repository**
4. Select `weather-dashboard` repository
5. Vercel auto-detects React configuration
6. Click **"Deploy"** and your site goes live!

### Environment Variables
No environment variables needed! The app works with public APIs out of the box.

## Project Structure

```
weather-dashboard/
├── src/
│   ├── components/
│   │   ├── CurrentWeatherPage.js    # Real-time weather display
│   │   ├── HistoricalPage.js        # Historical data query
│   │   ├── HistoricalGraphs.js      # Historical charts
│   │   └── HourlyGraphs.js          # Hourly forecast charts
│   ├── hooks/
│   │   └── useGPS.js                # GPS location hook
│   ├── services/
│   │   └── weatherService.js        # API integration
│   ├── App.js                       # Main app with routing
│   ├── index.js                     # Entry point
│   └── index.css                    # Global styles
├── public/
│   └── index.html
├── tailwind.config.js               # Tailwind CSS config
├── postcss.config.js                # PostCSS config
└── package.json
```

## Performance

- **LocalStorage Caching**: API responses cached for 10 minutes to reduce API calls
- **Lazy Loading**: Components load on demand via React Router
- **Optimized Charts**: Recharts renders efficiently even with large datasets
- **Responsive Images**: SVG icons scale perfectly on all devices
- **Code Splitting**: Production build is optimized for fast loading

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## License

This project is open source and available under the MIT License.

## Support

For issues or feature requests, please open an issue on GitHub: [https://github.com/amannegidev/weather-dashboard](https://github.com/amannegidev/weather-dashboard)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

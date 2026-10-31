# Weather App

A responsive weather web app that shows current weather conditions for any city or for your current location. Built with vanilla JavaScript, HTML, and CSS, using the [WeatherAPI](https://www.weatherapi.com/) REST API.

## Features

- **City search:** look up current weather for any city.
- **Geolocation lookup:** get weather for your current location using the browser's geolocation.
- **Weather details:** shows temperature, humidity, wind speed, and current conditions.
- **Error handling:** clear messages for invalid input, failed HTTP requests, and denied location access.
- **Dark / light theme:** your theme choice is saved in `localStorage` and restored on your next visit.
- **Responsive layout:** works on desktop and mobile screens.

## Tech Stack

- JavaScript (ES6), using `fetch` and `async/await`
- HTML5
- CSS3
- [WeatherAPI](https://www.weatherapi.com/) (REST API, JSON responses)

## Project Structure

```
Weather-App/
├── index.html   # Page structure
├── style.css    # Styling and theme
└── script.js    # API calls, search, geolocation, and theme logic
```

## Getting Started

### Prerequisites

- A modern web browser
- A free API key from [weatherapi.com](https://www.weatherapi.com/signup.aspx)

### Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/yashg0el/Weather-App.git
   cd Weather-App
   ```

2. Add your WeatherAPI key in `script.js` (replace the placeholder value with your own key).

3. Open `index.html` in your browser. For geolocation to work reliably, serve the folder over `localhost`:

   ```bash
   # Python 3
   python -m http.server 8000
   ```

   Then visit `http://localhost:8000`.

## How It Works

1. The app sends a request to the WeatherAPI endpoint using `fetch` with `async/await`.
2. It parses the JSON response and displays temperature, humidity, wind speed, and conditions.
3. If the request fails, the city is invalid, or location access is denied, it shows a clear error message instead of breaking.
4. The selected theme (dark or light) is saved in `localStorage`.

## Author

**Yash Goel**
GitHub: [github.com/yashg0el](https://github.com/yashg0el) | LinkedIn: [linkedin.com/in/yashg0el](https://linkedin.com/in/yashg0el)

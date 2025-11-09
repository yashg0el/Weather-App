// --- CONFIG ---
const apiKey = "10ec5f1f4ec342dfa5280811250911"; // your key
const baseUrl = "https://api.weatherapi.com/v1"; // use HTTPS!

// --- DOM ---
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const errorMsg = document.getElementById("error");
const locationBtn = document.getElementById("location-btn");
const themeToggle = document.getElementById("theme-toggle");

// --- EVENTS ---
searchBtn.addEventListener("click", getWeatherByCity);
locationBtn.addEventListener("click", getWeatherByLocation);
themeToggle.addEventListener("click", toggleTheme);

// allow pressing Enter
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") getWeatherByCity();
});

// --- FUNCTIONS ---
function showError(message, verbose = null) {
  console.error("WeatherApp error:", message, verbose ?? "");
  errorMsg.textContent = message;
  errorMsg.classList.remove("hidden");
  weatherInfo.classList.add("hidden");
}

function clearError() {
  errorMsg.textContent = "";
  errorMsg.classList.add("hidden");
}

// build URL safely
function buildUrl(path, q) {
  const qEncoded = encodeURIComponent(q);
  return `${baseUrl}/${path}.json?key=${apiKey}&q=${qEncoded}&aqi=yes`;
}

async function fetchWeatherUrl(url) {
  clearError();
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      // provide more info if available
      const text = await resp.text().catch(() => "");
      throw new Error(`HTTP ${resp.status} - ${resp.statusText} ${text}`);
    }
    const data = await resp.json();
    return data;
  } catch (err) {
    // network or parse error
    showError("❌ Unable to fetch weather. See console for details.", err.message || err);
    throw err;
  }
}

async function getWeatherByCity() {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name!");
    return;
  }
  const url = buildUrl("current", city);
  try {
    const data = await fetchWeatherUrl(url);
    displayWeather(data);
  } catch (e) {
    // already handled in fetchWeatherUrl
  }
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    showError("❌ Geolocation is not supported by your browser.");
    return;
  }
  clearError();
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;
      const coord = `${latitude},${longitude}`;
      const url = buildUrl("current", coord);
      try {
        const data = await fetchWeatherUrl(url);
        displayWeather(data);
      } catch (e) {}
    },
    (err) => {
      console.warn("Geolocation error:", err);
      showError("⚠️ Location access denied or unavailable.");
    },
    { timeout: 10000 }
  );
}

function displayWeather(data) {
  if (!data || !data.location || !data.current) {
    showError("Received unexpected response from API.");
    return;
  }

  const { location, current } = data;
  document.getElementById("city-name").textContent = `${location.name}, ${location.country}`;
  document.getElementById("temp").textContent = Number(current.temp_c).toFixed(1);
  document.getElementById("condition").textContent = current.condition?.text || "";
  document.getElementById("humidity").textContent = current.humidity;
  document.getElementById("wind").textContent = current.wind_kph;
  const iconEl = document.getElementById("weather-icon");
  if (current.condition?.icon) {
    iconEl.src = current.condition.icon.startsWith("//") ? `https:${current.condition.icon}` : current.condition.icon;
    iconEl.alt = current.condition.text || "weather icon";
  } else {
    iconEl.src = "";
    iconEl.alt = "";
  }

  clearError();
  weatherInfo.classList.remove("hidden");
}

// theme toggle (persists in localStorage)
function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("weather_theme_dark", isDark ? "1" : "0");
}

// apply saved theme on load
(function initTheme() {
  const saved = localStorage.getItem("weather_theme_dark");
  if (saved === "1") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }
})();

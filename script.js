// Watch

let time = document.getElementById("time");
let _date = document.getElementById("date");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Function For Digital Watch(Time&Date)

let clock = () => {
    let date = new Date();

    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    const ampm = hr >= 12 ? 'PM' : 'AM';
    hr = hr % 12;
    hr = hr ? hr : 12; // the hour '0' should be '12'

    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    let dt = date.getDate();
    let yr = date.getFullYear();

    time.innerHTML = String(hr).padStart(2, '0') + ":" + String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0') + " " + ampm;
    _date.innerHTML = `${dt} ${month}, ${yr}, ${day}`;
}
// Calling Time&Date Function
setInterval(() => {
    clock();
}, 1000);

// Function for get user location

let cityName = '';

async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, error => {
            reject(error);
        });
    });
}

async function my_loc() {
    try {
        const location = await getCurrentLocation();
        // console.log(`Latitude: ${location.latitude}, Longitude: ${location.longitude}`);
        const lon = `${location.longitude}`;
        const lat = `${location.latitude}`;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const locationName = data.address.city || data.address.town || data.address.village;
                const locName = `${locationName}`
                loc_details(locName);
                cityName = locationName;
                return cityName;
            })
            .catch(error => console.error(error));
        // Use the location data here
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Calling Location Function
my_loc();

// Function to get location name
function loc_details(loc_Name) {
    let getLocName = loc_Name;
    console.log(getLocName);
    return getLocName;
}


// API for Temperature
const api = {
    key: "47df47eda164b04f67ad1cbf59f2b6a2",
    base: "https://api.openweathermap.org/data/2.5/"
};

const city = "Farrukhabad, Uttar Pradesh, 209625, India";
const url = `${api.base}weather?q=${city}&units=metric&appid=${api.key}`;

// Function for Temperature
let fetch_temp = () => {

    let temperature = document.getElementById("temperature");
    let hum = document.getElementById("humidity");
    let _city = document.getElementById("city");
    let feel = document.getElementById("feels-like");
    let _wind = document.getElementById("wind");
    let fc = document.getElementById("forecast");

    // Temperature from API
    fetch(url).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        temperature.innerHTML = `Temp : ${data.main.temp}°C`;
        _city.innerHTML = `City : ${data.name}`;
        feel.innerHTML = `Feels-like : ${data.main.feels_like}°C`;
        fc.innerHTML = `Forecast : ${data.weather[0].description}`;
        hum.innerHTML = `Humidity : ${data.main.humidity}%`;
        _wind.innerHTML = `Wind : ${data.wind.speed} km/h`;
    }).catch((err) => {
        console.log(err);
    });
}

// Calling Temperature Function
fetch_temp();

// Dark Mode Function

let darkMode = document.getElementById("dark-mode");
let body = document.body;

// Function For DarkMode
let dark_mode = () => {

    darkMode.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            darkMode.innerText = "Light Mode";
        } else {
            darkMode.innerText = "Dark Mode";
        }
    });
}
// Calling DarkMode Function
dark_mode();


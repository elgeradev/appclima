let api_key = "755c54c14573f86466780061c1480f25";
let urlBase = "https://api.openweathermap.org/data/2.5/weather?q=";
let id = 3860259; // ID de la ciudad (ejemplo: Buenos Aires)
let city=cordoba;

fetch(`${urlBase}${city}&appid=${api_key}`, {
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
    }
})
.then(response => response.json()) 
.then(response => console.log(json));
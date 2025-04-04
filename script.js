let partes = ["755c", "54c1", "4573", "f864", "6678", "0061", "c148", "0f25"];
let api_key = partes.join("");
let urlBase = "https://api.openweathermap.org/data/2.5/weather?q=";
let diferencia =273.15;
let idioma="es"

let map;


document.getElementById('botonBusqueda').addEventListener('click',() => {

   const ciudad =document.getElementById('ciudadEntrada').value;
     if (ciudad){

        fetchDatosClima (ciudad);  

               }

})

function initMap() {
    const options = {
      zoom: 1,
      center: { lat: -31.40629, lng: -64.20788 }, // Coordenadas para centrar el mapa
    };
    map = new google.maps.Map(document.getElementById("map"), options);

    // Escuchar el evento de clic en el mapa
    google.maps.event.addListener(map, 'click', function(event) {
        getCityName(event.latLng); // Obtener el nombre de la ciudad con las coordenadas del clic
    });
}

function getCityName(latLng) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
            let city = "Ciudad no encontrada";
            for (const component of results[0].address_components) {
                if (component.types.includes("locality")) {
                    city = component.long_name;
                    break;
                }
            }
            document.getElementById("ciudadEntrada").value=city;
            fetchDatosClima(city);
        } else {
         
        }
    });
}

function fetchDatosClima (ciudad){

    fetch(`${urlBase}${ciudad}&appid=${api_key}&lang=${idioma}`)
    .then(data=> data.json()) 
    .then(data =>mostrarDatosClima(data))

}

document.getElementById("weather-icon").style.display="none";

function mostrarDatosClima(data) {

    const divDatosClima =document.getElementById("datosClima")
    divDatosClima.innerHTML=""
    const ciudadNombre =data.name;
    const temperatura = Math.round (data.main.temp - diferencia);
    const descripcion = data.weather[0].description;
    const icono = data.weather[0].icon;
    const humedad=data.main.humidity;
    const humedadInfo=document.createElement("p")
     const ciudadTitulo = document.createElement ("h2")
    ciudadTitulo.textContent=ciudadNombre;
    const temperaturaInfo   = document.createElement("p")
    temperaturaInfo.textContent =`La temperatura actual en ${ciudadNombre} es de: ${temperatura} grados Centigrados`
    const descripcionInfo = document.createElement ("p")
    humedadInfo.textContent=`La Humedad es de: ${humedad}%`;
    descripcionInfo.textContent=`La descripcion meteorologica es:  ${descripcion}`;
    descripcionInfo.className="descripcion"
    temperaturaInfo.className="temperatura"
    const imagen=document.createElement("img");
    imagen.src=`https://openweathermap.org/img/wn/${icono}@4x.png`;
    document.getElementById("datosClima").appendChild(ciudadTitulo)
    document.getElementById("datosClima").appendChild(temperaturaInfo)
    document.getElementById("datosClima").appendChild(humedadInfo);
    document.getElementById("datosClima").appendChild(descripcionInfo)
        document.getElementById("datosClima").appendChild(imagen);
    decir(temperaturaInfo.textContent);
    decir(humedadInfo.textContent);
    decir(descripcionInfo.textContent);
  

}



function decir (texto) {

speechSynthesis.speak(new SpeechSynthesisUtterance (texto));

}


async function traducirTexto(textoEnIngles) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=${encodeURI(textoEnIngles)}`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        const textoTraducido = datos[0][0][0];  // Obtiene el texto traducido
        return textoTraducido; // Devuelve el texto traducido
        
    } catch (error) {
        console.error("Error al traducir:", error);
               return textoEnIngles; 
    }
}

// Función para obtener el texto en inglés y mostrarlo traducido


async function mostrarTextoTraducido(texto) {
    const textoTraducido = await traducirTexto(texto);
    return textoTraducido;

} 

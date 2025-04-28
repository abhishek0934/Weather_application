const inputbox=document.querySelector('.input-box');
const searchbtn=document.querySelector('#searchbtn');
const weather_img=document.querySelector('.weather-img');
const temperature=document.querySelector('.temperature');
const description=document.querySelector('.description');
const humidity= document.getElementById("humidity")
const windspeed= document.getElementById("wind-speed");
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');


async function checkweather(city){
    const api_key="4c8bc01e81088ce5e93eeecb6f15c114";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data= await fetch(`${url}`).then(response =>response.json());
    if (weather_data.cod === '404') {
        console.log("error");
        location_not_found.style.display = "flex"; 
        weather_body.style.display = "none";   
        return;
    }
    
    location_not_found.style.display = "none"; 
    weather_body.style.display = "flex";

    temperature.innerHTML=`${Math.round(weather_data.main.temp-273.15)}°C`;
    description.innerHTML=`${weather_data.weather[0].description}`;
   humidity.textContent = `${weather_data.main.humidity}%`;
   windspeed.textContent = `${weather_data.wind.speed}Km/H`;

   switch(weather_data.weather[0].main){
    case 'Clouds':
        weather_img.src = "asset/cloud.png";
        break;
    case 'Clear':
        weather_img.src = "asset/clear.png";
        break;
    case 'Rain':
        weather_img.src = "asset/rain.png";
        break;
    case 'Mist':
        weather_img.src = "asset/mist.png";
        break;
    case 'Snow':
        weather_img.src = "asset/snow.png";
        break;
}
   console.log(weather_data);
    
}

inputbox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkweather(inputbox.value);
    }
});
    
searchbtn.addEventListener('click',()=>{
    checkweather(inputbox.value);


});





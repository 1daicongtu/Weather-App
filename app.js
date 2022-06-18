const APIKey = "f4f38d9a9345e80f82380e6e7c96df33";
const defaultCity = "Hà Nam";
const $ = document.querySelector.bind(document);
const box__info = $(".box__info");
const urlBackground = "https://source.unsplash.com/1600x900/?";
const btnSearch = $("#id-search");
const inputName = $("#input-country-id");
const root = $(".root");

function getDataApi(cityName){
    
    return fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" +APIKey)
    .then(res => res.json())
    .then(data => {
        if (data["cod"] === 200) {
            return data;
        } else {
            return null;
        }
    })
}

async function render(cityName = defaultCity){
    if (cityName === ""){
        return;
    }
    const data = await getDataApi(cityName);
    
   
    if (data){
        box__info.innerHTML = "";
        const timezoneInMinutes = data.timezone / 60;
        const currentTime = moment().utcOffset(timezoneInMinutes).format("LLL");
        const sunriseTime = moment
        .unix(data.sys.sunrise)
        .utcOffset(timezoneInMinutes)
        .format("LT");

        const sunsetTime = moment
        .unix(data.sys.sunset)
        .utcOffset(timezoneInMinutes)
        .format("LT");
     
        root.style.backgroundImage = `url('${urlBackground}${cityName}')`;
        $(".search-err").classList.remove("active");
        box__info.innerHTML = 
        `<h1 id="name-city">Weather in ${data.name}, ${data.sys.country}</h1>
        <span id="datetime-id">${currentTime}</span>
        <p id="temp-id">${data.main.temp.toFixed(1)} °C</p>
        <p id="feellike-temp-id">Feels like ${data.main["feels_like"].toFixed(1)} °C</p>
        <p id="min-temp-id">Min:${data.main.temp_min.toFixed(1)} °C</p>
        <p id="max-temp-id">Max:${data.main.temp_max.toFixed(1)} °C</p>

        <div class="weather__description">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="anh mo ta">
            <span id=weather__desp__title>${data.weather[0].main}</span>
        </div>
        <div class="main__weather__list">
            <div class="main__weather__item">
                <img class="main__weather__item-img" src="./image/gioiNuoc.png" alt="">
                <span id="do-am-id">${data.main.humidity}%</span>
            </div>
            <div class="main__weather__item">
                <img class="main__weather__item-img" src="./image/nhietKe.svg" alt="">
                <span id="nhiet-ke-id">${data.main.pressure} hPa</span>
            </div>
            <div class="main__weather__item">
                <img class="main__weather__item-img" src="./image/wind.svg" alt="">
                <span id="suc-gio-id">${data.wind.speed} m/s</span>
            </div>
        </div>
        <div class="subset__info">
            <div class="sunset-rise">
                <img src="./image/matTroi.svg" alt="">
                <p id="sunset__rise-hour">${sunriseTime}</p>
            </div>
            <div class="sunset-drop">
                <img src="./image/matTroi2.svg" alt="">
                <p id="sunset__drop-hour">${sunsetTime}</p>
            </div>
        </div>`
    }  else{
        $(".search-err").classList.add("active");
    }
    
}

function start(){
    render();
    if (btnSearch){
        btnSearch.addEventListener("click", ()=>{
            inputName.value && render(inputName.value.trim());
        })
    }
}
start();

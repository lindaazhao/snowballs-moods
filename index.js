//--General Steps--
//get data from API
//extract relevant data 
//extract weather from API result
//use weather result to select an image
//set image as source of image element in HTML file

//get data from API & extract weather data
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

//use local weather data so it's customized to the user's location
//17/01/19 - get user geolocation get data from API based on their location
geolocation = httpGet("https://ipapi.co/json/");
// console.log(geolocation);
const currentLocation = JSON.parse(geolocation).city;
// console.log(currentLocation);


//adding multiple cities!!
city = [currentLocation, 'Tokyo', 'Paris', 'New York', 'Sydney', 'Moscow', 'Rio de Janeiro']
// console.log(city.length);

var i;
for (i in city) {
    apiData = httpGet('https://api.openweathermap.org/data/2.5/weather?q=' + city[i] + '&appid=c9fdb9eb132c0e63ba646c3752930d38');
    // console.log(apiData);
    const weatherData = JSON.parse(apiData).weather;
    // console.log(weatherData);

    //"parse" weather condition codes and assign them to snowball moods
    let weatherConditionCode = (weatherData[0].id);
    // console.log(Math.floor(weatherConditionCode / 100));

    //extract sunrise and sunset times
    const sunriseTime = JSON.parse(apiData).sys.sunrise;
    // console.log(sunriseTime);
    const sunsetTime = JSON.parse(apiData).sys.sunset;
    // console.log(sunsetTime);

    //get current time (for the correct city) to determine if snowball is charging or woke
    let now = Math.round((new Date()).getTime() / 1000);
    // console.log(now);


    var snowballsMood;
    //snowball is woke for sunriseTime + 1800 seconds
    if (now > sunriseTime && now < sunriseTime + 1800) {
        snowballsMood = 'woke ( 0 0 )';
        selectedImage = 'woke snowball.png';
        // console.log('Snowball is ' + snowballsMood);
    }

    //display moods when snowball is not charging or woke
    else if (now > sunriseTime && now < sunsetTime) {
        const roundedWCC = (Math.floor(weatherConditionCode / 100));
        // WCC = weather condition code

        if (roundedWCC == 2 || roundedWCC == 3 || roundedWCC == 5 || roundedWCC == 7) {
            // 200 and 300 weather condition codes are thunderstorm and drizzle (respectively)
            // 500 WCCs are rain and 700 WCCs are i n t e r e s t i n g atmosphere conditions
            snowballsMood = 'dazed ( @ @ )';
            selectedImage = 'dazed snowball.png';
        }
        else if (roundedWCC == 6) {
            snowballsMood = 'winking ( 0 ^ )';
            selectedImage = 'winking snowball.png';
        }
        else if (weatherConditionCode == 800 || weatherConditionCode == 801) {
            snowballsMood = 'happy ( ^ ^ )';
            selectedImage = 'happy snowball.png';
        }
        else if (weatherConditionCode == 802 || weatherConditionCode == 803 || weatherConditionCode == 804) {
            snowballsMood = 'shy ( > < )';
            selectedImage = 'shy snowball.png';
        }
        // console.log('Snowball is ' + snowballsMood);
    }

    //as long as "now" is not in between sunrise and sunset time, snowball is charging
    else {
        snowballsMood = 'charging ( [||||] )';
        selectedImage = 'charging snowball.png';
        // console.log('Snowball is ' + snowballsMood);
    }
    const snowballmood = document.getElementById("demo" + i);
    snowballmood.innerHTML = ('Snowball is ' + snowballsMood + "!");
    // console.log('snowballmood is ' + snowballmood);

    let date = new Date(now * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    // let seconds = "0" + date.getSeconds();

    // Will display time in 10:30 format
    let formattedTime = hours + ':' + minutes.substr(-2);
    // console.log(formattedTime);

    //when snowball is charging/woke, print time + charging/woke
    //else print time + weather + mood
    if (snowballsMood == 'charging ( [||||] )') {
        // console.log('It is currently ' + formattedTime + ' in ' + city[i] + ', so Snowball is charging. Check back another time when the sun is up!');
        const snowballCharging = document.getElementById("demo" + i);
        snowballCharging.innerHTML = ('It is currently nighttime in ' + city[i] + ', so Snowball is charging. Check back another time when the sun is up!')
    }
    else if (snowballsMood == 'woke ( 0 0 )') {
        const snowballWoke = document.getElementById("demo" + i);
        snowballWoke.innerHTML = ('It is currently just past sunrise in ' + city[i] + ', so Snowball is woke. Check back soon!')
    }
    else {
        const snowballWeather = document.getElementById("weather" + i);
        let mainWeather = (weatherData[0].description);
        // console.log(mainWeather);
        snowballWeather.innerHTML = ('Current weather in ' + city[i] + ': ' + mainWeather)
    }
    const image = document.getElementById("snowballpicture" + i);
    image.src = "./images/" + selectedImage;
    // console.log(selectedImage);
}
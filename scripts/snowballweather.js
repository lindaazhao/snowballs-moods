//--General Steps--
//get data from API
//extract relevant data 
    //extract weather from API result
//use weather result to select an image
//set image as source of image element in HTML file

//this is what we used to get data from the local json file
//const weatherResult = JSON.parse('weather.json'); 
//console.log(weatherResult);
// console.log(weatherResult.weather);

//get data from API & extract weather data
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
apiData = httpGet('https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=c9fdb9eb132c0e63ba646c3752930d38');
console.log(apiData);

const weatherThing = JSON.parse(apiData).weather;
console.log(weatherThing);


//"parse" weather condition codes and assign them to snowball moods
let weatherConditionCode = (weatherThing[0].id);
console.log(Math.floor(weatherConditionCode / 100));


//extract sunrise and sunset times
const sunriseTime = JSON.parse(apiData).sys.sunrise;
console.log(sunriseTime);

const sunsetTime = JSON.parse(apiData).sys.sunset;
console.log(sunsetTime);


//get current to determine if snowball is charging or woke
let now = Math.round((new Date()).getTime() / 1000);
console.log(now)


let snowballsMood = 'happy ( ^ ^ )';

//snowball is woke for sunriseTime + 1800 seconds
if (now > sunriseTime && now < sunriseTime + 1800) {
    snowballsMood = 'woke ( 0 0 )';
    selectedImage = 'woke snowball.png';
    const image = document.getElementById("snowballpicture");
    image.src = "./Snowball pictures/" + selectedImage;
    console.log(selectedImage);

    console.log('Snowball is ' + snowballsMood);
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
    const image = document.getElementById("snowballpicture");
    image.src = "./Snowball pictures/" + selectedImage;
    console.log(selectedImage);
    }
    else if (roundedWCC == 6) {
        snowballsMood = 'winking ( 0 ^ )';
        selectedImage = 'winking snowball.png';
        const image = document.getElementById("snowballpicture");
        image.src = "./Snowball pictures/" + selectedImage;
        console.log(selectedImage);
    }
    else if (weatherConditionCode == 800 || weatherConditionCode == 801) {
        snowballsMood = 'happy ( ^ ^ )';
        selectedImage = 'happy snowball.png';
        const image = document.getElementById("snowballpicture");
        image.src = "./Snowball pictures/" + selectedImage;
        console.log(selectedImage);
    }
    else if (weatherConditionCode == 802 || weatherConditionCode == 803 || weatherConditionCode == 804) {
        snowballsMood = 'shy ( > < )';
        selectedImage = 'shy snowball.png';
        const image = document.getElementById("snowballpicture");
        image.src = "./Snowball pictures/" + selectedImage;
        console.log(selectedImage);
    }
    
    console.log('Snowball is ' + snowballsMood);
}

//as long as "now" is not in between sunrise and sunset time, snowball is charging
else {
    snowballsMood = 'charging ( [||||] )';
    selectedImage = 'charging snowball.jpg';
    const image = document.getElementById("snowballpicture");
    image.src = "./Snowball pictures/" + selectedImage;
    console.log(selectedImage);

    console.log('Snowball is ' + snowballsMood);
}


//change text in HTML document to tell user what mood snowball is in
const snowballmood = document.getElementById("demo");
snowballmood.innerHTML = ('Snowball is ' + snowballsMood + "!");
console.log('snowballmood is ' + snowballmood); 


//next: tell the user what time it is and why snowball is what mood he is in

//get the current time in hour/min/second format
let date = new Date(now * 1000);
// Hours part from the timestamp
let hours = date.getHours();
// Minutes part from the timestamp
let minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
// let seconds = "0" + date.getSeconds();

// Will display time in 10:30 format
let formattedTime = hours + ':' + minutes.substr(-2);
console.log(formattedTime);

//when snowball is charging/woke, print time + charging/woke
//else print time + weather + mood
if (snowballsMood == 'charging ( [||||] )') {
    console.log('It is currently ' + formattedTime + ', so Snowball is charging. Check back another time when the sun is up!');
    const snowballCharging = document.getElementById("demo");
    snowballCharging.innerHTML = ('It is currently ' + formattedTime + ', so Snowball is charging. Check back another time when the sun is up!')
}
else if (snowballsMood == 'woke ( 0 0 )') {
    const snowballWoke = document.getElementById("demo");
    snowballWoke.innerHTML = ('It is currently ' + formattedTime + ', so Snowball is woke. Check back soon!')
}
else {
    const snowballWeather = document.getElementById("weather");
    let mainWeather = (weatherThing[0].description);
    console.log(mainWeather);
    snowballWeather.innerHTML = ('Current Weather: ' + mainWeather)
}
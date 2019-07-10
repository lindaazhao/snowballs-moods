const snowballsMoods = [
    'dazed ( @ @ )', 
    'charging ( [||||] )', 
    'shy ( > < )', 
    'woke ( 0 0 )', 
    'winking ( 0 ^ )', 
    'happy ( ^ ^ )'];

function snowballMood() {
    let random = 0; 
    // random = Math.random() * 6;
    random = Math.floor(Math.random() * 6); // 1.5 => 1
    console.log(random);
    return snowballsMoods[random];
}

let mood = snowballMood();
console.log('Snowball is ' + mood);


// document.getElementById("demo").innerHTML = ('snowball is ' + snowballMood());
//this is the same thing as the thing above it
const snowballmood = document.getElementById("demo");
snowballmood.innerHTML = ('Snowball is ' + mood + "!");
// console.log('snowballmood is: ' + snowballmood);

//document.getElementById("snowballpicture").src = "./Snowball pictures/happy snowball.png";
// const image = document.getElementById("snowballpicture");
// image.src = "./Snowball pictures/happy snowball.png";
// console.log('image is: ' + image);

const snowballsPictures = [
    'dazed snowball.png', 
    'charging snowball.jpg', 
    'shy snowball.png', 
    'woke snowball.png', 
    'winking snowball.png', 
    'happy snowball.png'];

// output one of the images in snowballsPictures based on mood (the variable)
// if mood = charging ( [||||] )
if (mood == 'dazed ( @ @ )'){
    selectedImage = 'dazed snowball.png'
    const image = document.getElementById("snowballpicture");
    image.src = "./Snowball pictures/" + selectedImage;
    console.log(selectedImage);
}
else if (mood == 'charging ( [||||] )'){
    selectedImage = 'charging snowball.jpg'
    const image = document.getElementById("snowballpicture");
    image.src = "./Snowball pictures/" + selectedImage;
    console.log(selectedImage);
}
else if (mood == 'shy ( > < )'){
    selectedImage = 'shy snowball.png'
    const image = document.getElementById("snowballpicture");
    image.src = "./Snowball pictures/" + selectedImage;
    console.log(selectedImage);
}
else if (mood == 'woke ( 0 0 )'){
    selectedImage = 'woke snowball.png'
    const image = document.getElementById("snowballpicture");
    image.src = "./Snowball pictures/" + selectedImage;
    console.log(selectedImage);
}
else if (mood == 'winking ( 0 ^ )'){
    selectedImage = 'winking snowball.png'
    const image = document.getElementById("snowballpicture");
    image.src = "./Snowball pictures/" + selectedImage;
    console.log(selectedImage);
}
else if (mood == 'happy ( ^ ^ )'){
    selectedImage = 'happy snowball.png'
    const image = document.getElementById("snowballpicture");
    image.src = "./Snowball pictures/" + selectedImage;
    console.log(selectedImage);
}
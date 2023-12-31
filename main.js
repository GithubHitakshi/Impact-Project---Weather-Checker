nose_x = "";
nose_y = "";
filter = "";
temp = "";

function preload() {
    img = loadImage("https://i.postimg.cc/vTWCJVnx/Clown-Nose-Download-PNG-Image.png");
    rain = loadImage("https://i.postimg.cc/CKL61s30/62cbbf3021778f2f6db1320a261fb88b.gif");
    sun = loadImage("https://i.postimg.cc/MK9Bw0mV/sun-blowing-air-animation.gif");
    winter = loadImage("https://i.postimg.cc/Wb55ykDf/3iCP.gif");
    goggle = loadImage("https://i.postimg.cc/Xv5qRv3D/kisspng-portable-network-graphics-clip-art-glasses-lens-tr-fotos-para-montagem-png-culos-cabelos-ch.jpg");
    winter_cap = loadImage("https://i.postimg.cc/Hs1zj1RH/istockphoto-1295941618-612x612.jpg");
    thermometer = loadImage("https://i.postimg.cc/7Yw3J7Zq/thermometer.png");
    wind_speed = loadImage("https://i.postimg.cc/W3BqJWg9/kisspng-wind-speed-weather-forecasting-clip-art-wind-5ac490395251b7-2113202415228314173372.png");
    humidity_img = loadImage("https://i.postimg.cc/BQtRvmMW/pngwing-com.png");
    haze_img = loadImage("https://i.postimg.cc/t40TrYgY/53-537475-fog-gif-png-transparent-png.jpg");
    place = loadImage("https://i.postimg.cc/yd4GgHYJ/3179068.png");
    }

function setup() {
    canvas = createCanvas(500, 500);
    canvas.position((screen.width / 2) - 250, 250);
    video = createCapture(VIDEO);
    video.size(500, 500);
    video.hide();
    pose_model = ml5.poseNet(video, model_loaded);
    pose_model.on("pose", get_results);
}

function draw() {
    image(video, 0, 0, 500, 500);
    //image(img,nose_x-15,nose_y-15,30,30);
    if (filter != "" && temp != "") {
        image(thermometer, 20, 20, 50, 60);
        fill("yellow");
        textSize(30);
        text(temp + "°C", 80, 40);
        textSize(25);
        fill("white")
        text("Feels Like - " + feels_like + "°C", 80, 70);
        image(wind_speed, 20, 140, 50, 50);
        fill("yellow");
        textSize(30);
        text(wind + " m/s", 80, 175);
        image(humidity_img, 20, 195, 50, 50);
        fill("yellow");
        textSize(30);
        text(humidity+"%", 80, 235);
        image(place, 220, 420, 50, 50);
        fill("white");
        textSize(30);
        text(city_name, 270, 453);
        
   
       }
        }
    






function take_snap() {
    save("mypic.png");
}

function model_loaded() {
    console.log("model loaded Successfully")
}

function get_results(r) {
    if (r.length > 0) {
        //console.log(r);
        rightEye_x = r[0].pose.rightEye.x;
       rightEye_y = r[0].pose.rightEye.y;
       console.log("Right Eye x:"+nose_x,"Right Eye y:"+nose_y);

    }
}

async function getWeather() {
    city = document.getElementById("city").value;
    api_url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=143454aa39bbe3442a890cdbf3f9db36";
    response = await fetch(api_url);
    data = await response.json();
    console.log(data);
    temp = ftoc(data.main.temp);
    feels_like = ftoc(data.main.feels_like);
    weather = data.weather[0].main;
    humidity = data.main.humidity;
    wind = data.wind.speed;

    
    city_name = document.getElementById("city").value;
} 
   


function ftoc(tem) {
    temp_c = round((tem - 32) * (5 / 9));
    return temp_c;
}
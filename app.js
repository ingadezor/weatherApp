const express = require("express");
const https = require("https");
const bodyParser = require("body-parser"); //to parse form data entered by user



const app = express();
app.use(bodyParser.urlencoded( {extended: true}));






//ROUTES
app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html");
})


app.post("/", function(req, res){
    const city = req.body.city; //getting city entered by user in the form
    const apiKey = "583f474830543d120cfe78fac64bb1eb";
  

    //fetching weather data from openweathermap api
    https.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric", function(response){
        if(response.statusCode == 200){
            response.on("data", function(data){
                const weatherData = JSON.parse(data);  //weather data is a js object now
                const temp = weatherData.main.temp;
                const description = weatherData.weather[0].description;
                const imgLink = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
                
                
                //sending data to user
                res.write("<h1>Weather in " + city + " :</h1>");
                res.write("<p>Today's temperature is " + temp + "</p>");
                res.write("<p>The weather is " + description +"</p>");
                res.write("<img src=" + imgLink + ">");
                res.send();
            })
        }
    })

})





app.listen(3000, function(){
    console.log("server is running");
})
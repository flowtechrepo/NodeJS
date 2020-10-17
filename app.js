//jshint esversion:6

const express = require ("express");//framework of node.js
const bodyParser = require ("body-parser");//module to parse data
const https = require ("https");//module to get data from the url

const app = express();
app.use(bodyParser.urlencoded({extended:true}));//to get pass and fetch the data on the body of the url

app.get("/", function(req, res)
{
  res.sendFile(__dirname + "/index.html");

});

//get a dinamic data, based on what they used a type to the input on cath that data in app.post
//and use the query to structure the url
app.post("/", function(req, res){
const query = req.body.cityName; //use body-parser to get the data based on what they input on the post
const apiKey = "94914af4ed8d516a5accba8b3705f235";
const units = "metric";
const url =  "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
https.get(url, function(response) //get all the data from the particular location
  {

//https://api.openweathermap.org/data/2.5/weather?q=London&appid=94914af4ed8d516a5accba8b3705f235&units=metric
    console.log(response.statusCode);

// pass the jSON data we get back and set it over to the browser using the express and the node module.
        response.on("data", function(data){

        const weatherData = JSON.parse(data);// pass the Json data to get back
        const temp =  weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<p>The weather is currently " + weatherDescription + "</p>");
        res.write("<h1>Temperature in "+ query + " is " + temp + " Degrees Celcius</h1>");
        res.write("<img src= " + imageURL + "  >");
        res.send();// send it over to the browser using node modules and express

        console.log(weatherData);
       });

   });


});


app.listen(3000, function(){

console.log("Server is running on port 3000.");

});

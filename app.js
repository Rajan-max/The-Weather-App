const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

})

app.post("/",function(req,res){
  
  const city=req.body.cityname;
    const apikey="c9b2341273fb27e91ba08ab62db5eafd";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?&q="+city+"&appid="+apikey+"&units="+units;
    https.get(url, function(response){
       console.log(response.statusCode);

       response.on("data",function(data){
          const weatherdata=JSON.parse(data);
          const temp=weatherdata.main.temp;
          const weatherdesp=weatherdata.weather[0].description;

          res.write("<h1>The temperature in "+city+" is: "+temp+" degree celcius</h1>");
          res.write("<p>The weather in "+city+" is "+weatherdesp+"</p>");
          res.send();
       })
    })
    
})

// const city="kathmandu";
//     const apikey="c9b2341273fb27e91ba08ab62db5eafd";
//     const units="metric";
//     const url="https://api.openweathermap.org/data/2.5/weather?&q="+city+"&appid="+apikey+"&units="+units;
//     https.get(url, function(response){
//        console.log(response.statusCode);

//        response.on("data",function(data){
//           const weatherdata=JSON.parse(data);
//           const temp=weatherdata.main.temp;
//           const weatherdesp=weatherdata.weather[0].description;

//           res.write("<h1>The temperature in kathmandu is: "+temp+" degree celcius</h1>");
//           res.write("<p>The weather in kathmandu is "+weatherdesp+"</p>");
//           res.send();
//        })
//     })

app.listen(3000,function(){
    console.log("server is running on port 3000");
})

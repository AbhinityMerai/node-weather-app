const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const forecast = require("./utils/forecast");
const geoLocUrl = require("./utils/geoLoc");

app.set('view engine','hbs')
app.set('views', path.join(__dirname,'../templates/views'))

hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.use(express.static(path.join(__dirname,'../public')));

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'please provide address'
        })
    }

    geoLocUrl(req.query.address, (error, {latitude,longitude, location}={}) => {
        if (error) {
          return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({error});
          }
          res.send({
            forecast:forecastData,
            location:location,
            address:req.query.address
        })
        });
      });
})

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Abhinity Merai'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Abhinity Merai'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:"This is some helpful text.",
        title:'Help',
        name:'Abhinity Merai'
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:'404',
        name:'Abhinity Merai',
        errorMsg:'help page not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title:'404',
        name:'Abhinity Merai',
        errorMsg:'page not found'
    })
})

app.listen(3000,()=>{
    console.log('port 3000 running');
})


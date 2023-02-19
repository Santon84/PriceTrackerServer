var i = 0;
//var cron = require('node-cron');
const { getProductsList, getProductPrice } = require('./api/getData');
const { savePrice } = require('./api/setData');
const fetch = require("node-fetch");
require('dotenv').config()
var express = require('express');
var app = express();
var PORT = 3000;
const targetTags =  {
    ozon : {baseUrl: 'https://www.ozon.ru/api/composer-api.bx/page/json/v2?url=', name: '', price: '' },
  }

  async function getList() {
    console.log('getting list');
    let productList = null
    try {
        
        productList = await getProductsList().then(res => res);

    }
    catch(err) {
        console.log(err);
    }
    
    //console.log(productList);
    
    for (let product of productList) {
      
      let productPrice = 0;
    console.log('getting price')
      await getProductPrice(targetTags.ozon.baseUrl + product.url).then(res => {
        productPrice = res;
        console.log('ProductPrice - ', productPrice);
      }).catch(err => console.log(err));
      if (!productPrice) {
        console.log('Product price is empty, Can not get data from site');
        return;
      }
      console.log('saving data');
      await savePrice(product.id, productPrice).then(console.log('price added to database')).catch(err => console.log(err))
      
    }
  }
app.use(logger);
app.get('/', (req, res) => res.status(200).send('Home page'));
app.get('/about', (req, res) => res.status(200).send('About page'));

function hello() {
    console.log('hello node');
    setTimeout(()=> {
        console.log('Timer hello')
    }, 3000);
    console.log(process.env.RAPIDAPI_KEY);
}


function logger(req, res, next) {
    console.log('new connection');
    console.log(req.originalUrl);
    console.log(req.ip);
    
    next();
}

console.log('Server started');
//hello();
getList();
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})

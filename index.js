var i = 0;
//var cron = require('node-cron');
const { getProductsList, getProductPrice } = require('./api/getData');
const { savePrice } = require('./api/setData');
const fetch = require("node-fetch");

var express = require('express');
var app = express();
var PORT = 3000;
const targetTags =  {
    ozon : {baseUrl: 'https://www.ozon.ru/api/composer-api.bx/page/json/v2?url=', name: '', price: '' },
  }


  async function getList() {
    console.log('getting list');
    let productList = await getProductsList().then(res => res);
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

app.get('/', (req, res) => res.status(200).send('Home page'));
app.get('/about', (req, res) => res.status(200).send('About page'));




console.log('Server started');
getList();
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})
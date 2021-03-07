import express from 'express';
import NodeCache from 'node-cache';
import path from 'path';
import cors from 'cors';
import timeout from 'connect-timeout';

import { updateCache, test, getProductsWithAvailability }  from './controllers/productsAPI.js'

const app = express();
const port = process.env.PORT || 5000;

const warehouseCache = new NodeCache();
updateCache(warehouseCache);


// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, './client/build')));
app.use(cors());

app.get('/api', async (req, res) => { 
  const data = await warehouseCache.get('products');

  // const data = await getProductsWithAvailability();
  
  if (data) {
    res.json(data)
  }
})


function errorHandler (err, req, res, next) {
  console.log(err.message);
  if(error.message === 'cache empty') {
    return response.status(404).send({ error: 'cache data not ready yet' })
  }

  next(error)
}

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(503).send('Something broke!')
})


// Handle React routing, return all requests to React app
// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, './client/build', 'index.html'));
// });

// create a router for saving the api




// PRODUCTION
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, './client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
  });
}


app.listen(port, () => {
  console.log(`Example app listening port ${port}`)
})


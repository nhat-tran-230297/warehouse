import express from 'express';
import NodeCache from 'node-cache';
import path from 'path';
import cors from 'cors';

import { updateCache, getProductsWithAvailability }  from './controllers/productsAPI.js'

const app = express();
const port = process.env.PORT || 5000;

const warehouseCache = new NodeCache();

app.use(cors());

app.get('/api', async (req, res) => { 
  // const data = await warehouseCache.get('products');
  // const data = await getProductsWithAvailability();

  const data = await updateCache(warehouseCache, false);

  res.json(data)
})


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

//internal cache of 5 minutes
setInterval(() => {
  updateCache(warehouseCache, true);
}, 5 * 60 * 1000)

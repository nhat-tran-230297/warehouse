import express from 'express';
import path from 'path';
import cors from 'cors';

import getAvailability from './client/src/controllers/product.js'
// import productsRouter from './routes/product.js'

var app = express();
const port = process.env.PORT || 5000;

app.use(cors());


const router = express.Router();
router.get('/', async (req, res) => {
  const data = await getAvailability();
  res.json(data)
})

app.use('/api', router)

// production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, './client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Example app listening port ${port}`)
})


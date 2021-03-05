import express from 'express';
import path from 'path';
import cors from 'cors';

import getAvailability from './client/src/controllers/product.js'

var app = express();
const port = process.env.PORT || 5000;
// const router = express.Router();
// router.get('', async (req, res) => {
//   const data = await getAvailability();
//   res.json(data)
// })



app.use(cors());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, './client/build')));


let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
let workQueue = new Queue('work', REDIS_URL);

app.get('/api', async (req, res) => {
  
  const data = await getAvailability();
  let result = await workQueue.add();

  res.json(result)
})

// Handle React routing, return all requests to React app
// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, './client/build', 'index.html'));
// });

// create a router for saving the api




// PRODUCTIOn
// if (process.env.NODE_ENV === 'production') {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, './client/build')));
//   // Handle React routing, return all requests to React app
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, './client/build', 'index.html'));
//   });
// }


app.listen(port, () => {
  console.log(`Example app listening port ${port}`)
})


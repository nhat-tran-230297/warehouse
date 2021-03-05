import express from 'express';
import path from 'path';
import cors from 'cors';
import timeout from 'connect-timeout'

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

const extendTimeoutMiddleware = (req, res, next) => {
  const space = ' ';
  let isFinished = false;
  let isDataSent = false;

  // Only extend the timeout for API requests
  if (!req.url.includes('/')) {
    next();
    return;
  }

  res.once('finish', () => {
    isFinished = true;
  });

  res.once('end', () => {
    isFinished = true;
  });

  res.once('close', () => {
    isFinished = true;
  });

  res.on('data', (data) => {
    // Look for something other than our blank space to indicate that real
    // data is now being sent back to the client.
    if (data !== space) {
      isDataSent = true;
    }
  });

  const waitAndSend = () => {
    setTimeout(() => {
      // If the response hasn't finished and hasn't sent any data back....
      if (!isFinished && !isDataSent) {
        // Need to write the status code/headers if they haven't been sent yet.
        if (!res.headersSent) {
          res.writeHead(202);
        }

        res.write(space);

        // Wait another 15 seconds
        waitAndSend();
      }
    }, 60000);
  };

  waitAndSend();
  next();
};


app.get('/api', async (req, res) => { 
  const data = await getAvailability();
  res.json(data)
})

app.use(extendTimeoutMiddleware);


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


const express = require('express');
const routes = require('./routes');

const app = express();
app.use(require('cors')());
//public dir
app.use("/public",express.static('public'));

app.use('/s3', routes.s3Router);
app.use('/rekognition',routes.rekognitionRouter);
app.listen(3000, () => {
  console.log('listening on port 3000  http://localhost:3000');
});
const express = require('express');
const routes = require('./routes');

const app = express();
app.use('/s3', routes.s3Router);

app.listen(3000, () => {
  console.log('listening on port 3000  http://localhost:3000');
});
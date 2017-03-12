const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './src/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('app listening on 3000');
});

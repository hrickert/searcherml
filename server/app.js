const path = require('path');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;


app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = require('./routes');
app.use('/api', router);
app.use(function(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({ error: res.error });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
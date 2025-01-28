const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const pollRoutes = require('./routes/pollRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/polls', pollRoutes);

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dizplai';
mongoose.connect(mongoUri);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

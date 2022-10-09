if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const dbUrl = process.env.MONGO_CONNECT;
const path = require('path');
const bodyParser = require('body-parser');
const example = require('./routes/example');
const Example = require('./models/Example');

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('database connected');
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);

app.use('/example', example);

app.get('/', async (req, res) => {
  const allExamples = await Example.find({});
  res.render('index', { allExamples });
});

const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

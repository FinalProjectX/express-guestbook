const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const logger = require('morgan');
require('dotenv').config();

const indexRouter = require('./routes/index');
const entriesRouter = require('./routes/entries');

const uri = process.env.MONGO_DB_ATLAS_URI;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.info('error', error)
  }
}
run().catch(console.dir);


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet({ contentSecurityPolicy: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/entries', entriesRouter);

app.use((req, res) => res.status(404).render('pages/404'));

module.exports = app;

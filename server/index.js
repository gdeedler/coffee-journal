const express = require('express');
const morgan = require('morgan');
const path = require('path');
const routes = require('./controllers');
const cors = require('cors');
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();

const app = express();
const PORT = process.env.port || 3000;
const config = {
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: 'http://localhost:3000/',
  clientID: 'ZNognIQB1xtAwP5NirVeAbp4W1nhC5Tl',
  issuerBaseURL: 'https://dev-1mdmd8kt.us.auth0.com',
  routes: {
    login: '/api/login',
    logout: '/api/logout',
  }
};

app.use(express.static(path.join(__dirname, '../dist')));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/api/coffees', routes.getAll);
app.use(auth(config));

app.get('/api/auth', routes.addUser);
app.get('/api/coffees/:coffeeId', routes.getOneCoffee);
app.get('/api/journal/coffees', routes.getUserCoffees)
app.get('/api/brews', routes.getBrews);
app.get('/api/brews/all', routes.getAllBrews);
app.post('/api/brews/', routes.addBrew);
app.post('/api/coffees', routes.addCoffee);
app.delete('/api/journal/coffees/:coffeeId', routes.deleteCoffee);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

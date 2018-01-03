const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

// Middlewares
app.use((request, response, next) => {
  const now = new Date().toString();
  const log = `${now}: ${request.method} ${request.originalUrl}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
    next();
  });
});

// app.use((request, response, next) => {
//   response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'))  // serve static files


// Route handlers
app.get('/', (request, response) => {
  // response.send('<h1>Hello express!</h1>');
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'There was an error'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
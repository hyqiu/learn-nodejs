const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

// 3rd party add-on.
// Add 'middleware function'
// __dirname : path to directory

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('Unable to append to server.log')
    }
  });
  // next : when is your middleware done ?
  // IMPORTANT
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
  // no next : the site freezes on one page
})

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
})

app.get('/', (req, res) => {
// req : stores information (header, body, method, path...)
// res : respond to http request : what data to send back...

  //res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Henri',
  //   likes: [
  //     'biking',
  //     'cities'
  //   ]
  // })

  res.render('home.hbs', {
    pageTitle: 'My Homepage',
    welcomeText: 'Hi, I am a welcome text!',
    // currentYear: new Date().getFullYear()
  })
});

app.get('/about', (req, res) => {
  //res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
    // currentYear: new Date().getFullYear()
  });
});

// route /bad
// send back JSON
// error handling request

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request',
  })
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

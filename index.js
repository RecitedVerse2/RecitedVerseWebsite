var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// The different pages of the app, in the form "/your_page_extension (ex.) /about, /profile, etc.)"
app.get('/', function(request, response) { response.render('pages/profile.ejs'); });
app.get('/home', function(request, response) { response.render('pages/home.ejs'); });
app.get('/signup', function(request, response) { response.render('pages/signup.ejs'); });
app.get('/login', function(request, response) { response.render('pages/login.ejs'); });
app.get('/albums', function(request, response) { response.render('pages/albums.ejs'); });
app.get('/artists', function(request, response) { response.render('pages/artists.ejs'); });
app.get('/genres', function(request, response) { response.render('pages/genres.ejs'); });
app.get('/profile', function(request, response) { response.render('pages/profile.ejs'); });



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
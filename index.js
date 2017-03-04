var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// The different pages of the app, in the form "/your_page_extension (ex.) /about, /profile, etc.)"
app.get('/landing', function(request, response) {
  response.render('pages/landing');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


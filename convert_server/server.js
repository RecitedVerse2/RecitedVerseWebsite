const express = require('express');
const app = express();
const firebase = require('firebase');
const googleStorage = require('@google-cloud/storage');
const Multer = require('multer');
var admin = require("firebase-admin");
var fs = require('fs');
const { exec } = require('child_process');

var serviceAccount = require("./recitedverse.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://recitedverse-6efe4.firebaseio.com"
});


// As an admin, the app has access to read and write all data, regardless of Security Rules
//var db = admin.database();


app.listen(5005, () => {
  console.log('App listening to port 5005');

});

var bucket = admin.storage().bucket("gs://recitedverse-6efe4.appspot.com")
bucket.getMetadata().then(results => {
  //console.log(results[0])
  return null
})
.catch(error => {
  console.error(error)
})


var random = "tmp"; //Math.floor(Math.random() * Math.floor(1000))
var localFilename =   random + ".webm"
var covertedFile = random + ".mp3"
var root = "/home/yousong_zhang/RecitedVerseWebsite/convert_server/";
var finalCoverted = root + covertedFile;
console.log("local name"+ localFilename);
var metadata = {
  contentType: 'audio/mp3',
};



function processTask(id){

  const file = bucket.file("Recitations/"+id);
  file.exists(function(err, exists) {
    if(exists == false){
      console.log("file not exit"+id);
      return;
    }else{
      file.getMetadata(function(err, metadata, apiResponse) {
        console.log(metadata.contentType);
          if(metadata.contentType == "audio/mp3; codecs=opus"){

            file.createReadStream()
              .on('error', function(err) {console.log("error");})
              .on('response', function(response) {
                // Server connected and responded with the specified status and headers.
               })
              .on('end', function() {
                // The file is fully downloaded.
                console.log("finished load from firebase");
                processed(file);
                console.log("job done");
              })
              .pipe(fs.createWriteStream(localFilename));

          }else{
            console.log("not need processed for not opus");
            return
          }

      });

    }
  });



}



function processed(file){
  exec("rm -rf *.mp3 ", (err, stdout, stderr) => {
    if (err) {
      console.log(error);
    }
  });

  var command = "ffmpeg -i "+localFilename+" "+covertedFile;
  console.log(command);
  exec(command, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log(error);
    }
  });
  console.log("final convert paht : "+finalCoverted);
  if (fs.existsSync(finalCoverted)) {
    fs.createReadStream(finalCoverted)
      .pipe(file.createWriteStream())
      .on('error', function(err) {
        console.log("error upload");
      })
      .on('finish', function() {
        // The file upload is complete.
        console.log("finish upload");
        file.setMetadata(metadata, function(err, apiResponse) {});

        exec("rm "+ localFilename , (err, stdout, stderr) => {
          if (err) {
            // node couldn't execute the command
            console.log(error);
          }
        });

      });
  }else{
    console.log("coverted file not exit");
  }



}




function getDownloadURL(id){
  firebase.storage().ref().child('Recitations').child(id).getDownloadURL().then( (url) => {

            console.log(url);
            console.log("you should be here");
        });

    }




app.get('/convert', (req, res) => {
  var id = req.query.id;
  console.log(id);
  res.send({ express: 'job is done' });
  try {
  processTask(id);
}
catch(error) {
  console.error(error);
  // expected output: SyntaxError: unterminated string literal
  // Note - error messages will vary depending on browser
}
});

app.post('/convert', (req, res) => {
  var id = req.query.id;
  console.log(id);
  res.send({ express: 'job is done' });
  try {
  processTask(id);
}
catch(error) {
  console.error(error);
  // expected output: SyntaxError: unterminated string literal
  // Note - error messages will vary depending on browser
}
});

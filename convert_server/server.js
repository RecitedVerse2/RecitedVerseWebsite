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
var db = admin.database();
var ref = db.ref("server/saving-data/fireblog");

    ref.update({
      "nickname": "Amazing Grace"
    });

    var metadata = {
      contentType: 'audio/mp3',
    };

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
console.log("local name"+ localFilename);







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
  exec("rm -rf *.mp3", (err, stdout, stderr) => {
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
  if (fs.existsSync(covertedFile)) {
    fs.createReadStream(covertedFile)
      .pipe(file.createWriteStream())
      .on('error', function(err) {
        console.log("error upload");
      })
      .on('finish', function() {
        // The file upload is complete.
        console.log("finish upload");
        file.setMetadata(metadata, function(err, apiResponse) {});

        exec("rm "+ localFilename + "  "+ covertedFile, (err, stdout, stderr) => {
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




app.get('/hello', (req, res) => {
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

app.post('/hello', (req, res) => {
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
/**
 * Adding new file to the storage
 */
app.post('/upload', (req, res) => {
  console.log('Upload Image');

  let file = req.file;
  if (file) {
    uploadImageToStorage(file).then((success) => {
      res.status(200).send({
        status: 'success'
      });
    }).catch((error) => {
      console.error(error);
    });
  }
});

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadImageToStorage = (file) => {
  let prom = new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }
    let newFileName = `${file.originalname}_${Date.now()}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
  return prom;
}

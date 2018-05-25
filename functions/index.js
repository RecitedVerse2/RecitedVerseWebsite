const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const algoliasearch = require('algoliasearch');
const client = algoliasearch("I5KQF3O5KB", "42033f4e31521dd84c71ca19f4c9c744");

const ALGOLIA_POSTS_INDEX_NAME = 'recitedverse';


// trigger for recitations
exports.recitationCreated = functions.database.ref('/Recitations/{pushId}/').onCreate((snapshot, context) => {
    const index = client.initIndex(ALGOLIA_POSTS_INDEX_NAME);
    const original = snapshot.val();
    const firebaseObject = {
      recitation: original,
    };
  
    return index.saveObject(firebaseObject);
});

// trigger for users
exports.userCreated = functions.database.ref('/Users/{pushId}').onCreate((data, context) => {
    const index = client.initIndex(ALGOLIA_POSTS_INDEX_NAME);
    const original = snapshot.val();
    const firebaseObject = {
      user: original,
    };
  
    return index.saveObject(firebaseObject);
});
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const algoliasearch = require('algoliasearch');
// const client = algoliasearch(functions.config().algolia.app_id, functions.config().algolia.api_key);

const ALGOLIA_POSTS_INDEX_NAME = 'recitedverse';


// trigger for recitations
exports.userCreated = functions.database.ref('/Recitations').onWrite((data, context) => {

});

// trigger for users
exports.userCreated = functions.database.ref('/Users').onWrite((data, context) => {

});
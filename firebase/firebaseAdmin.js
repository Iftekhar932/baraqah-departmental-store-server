// firebaseAdmin.js

const admin = require("firebase-admin");
const serviceAccount = require("./baraqah-departmental-store-firebase-adminsdk-zpj3w-661b287694");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

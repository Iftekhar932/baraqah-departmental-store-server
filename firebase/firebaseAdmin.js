// firebaseAdmin.js

const admin = require("firebase-admin");
// const serviceAccount = require("./etc/secrets/FIREBASE_ADMIN_CREDENTIALS");
// const serviceAccount = require("./baraqah-departmental-store-firebase-adminsdk-zpj3w-661b287694");
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIAL);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

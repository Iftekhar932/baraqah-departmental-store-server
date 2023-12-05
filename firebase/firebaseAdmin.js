// firebaseAdmin.js

const admin = require("firebase-admin");
const serviceAccount = require("./baraqah-departmental-store-firebase-adminsdk-zpj3w-abe6105c31.json");
// const serviceAccount = require("./baraqah-departmental-store-firebase-adminsdk-zpj3w-661b287694.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://your-project-id.firebaseio.com",
});

module.exports = admin;

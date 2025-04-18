const admin = require("firebase-admin");
const serviceAccount = require("./doodledo-d7c4e-firebase-adminsdk-fbsvc-9272b64d8e.json");
require("dotenv").config();

// const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

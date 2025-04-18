const admin = require("firebase-admin");
require("dotenv").config();

// const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);

let serviceAccount;

if (process.env.FIREBASE_CONFIG) {
  // On Render or production
  serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
} else {
  // Local development fallback
  serviceAccount = require("./doodledo-d7c4e-firebase-adminsdk-fbsvc-9272b64d8e.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

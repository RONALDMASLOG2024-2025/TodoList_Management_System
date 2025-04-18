const admin = require("firebase-admin");
require("dotenv").config();

// const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);




  // // Local development fallback
  const serviceAccount = require("./etc/secrets/doodledo-d7c4e-firebase-adminsdk-fbsvc-9272b64d8e.json");

  // const serviceAccount = require("./doodledo-d7c4e-firebase-adminsdk-fbsvc-9272b64d8e.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

const admin = require("../firebase-admin");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
//   console.log("Received Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken); // ✅ FIXED METHOD
    req.user = decodedToken;

    console.log("Authenticated user UID:", decodedToken.uid);

    next();
  } catch (error) {
    console.error("Token verification failed", error);
    res.status(403).json({ message: "Unauthorized" });
  }
};

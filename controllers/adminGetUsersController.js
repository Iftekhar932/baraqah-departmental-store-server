// const User = require("../Schemas/UserSchema");
// got firebase for google sign in
const firebaseAdmin = require("../firebase/firebaseAdmin.js"); // Adjust the path accordingly

const adminGetUsersController = async (req, res) => {
  console.log("💜💜💜🟪🟪", req.user);
  try {
    if (req.user.role !== "admin") {
      console.log("from here");
      return res.sendStatus(403); //forbidden
    }
    console.log("not from here");

    const listUsersResult = await firebaseAdmin.auth().listUsers();
    const users = listUsersResult.users;
    // Send the users as a JSON response
    res.status(200).json({ firebaseAccounts: users });
  } catch (error) {
    console.error("Error listing users:", error);

    // Handle the error and send an appropriate response
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = adminGetUsersController;

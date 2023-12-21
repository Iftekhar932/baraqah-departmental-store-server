const User = require("../Schemas/UserSchema");
// got firebase for google sign in
const firebaseAdmin = require("../firebase/firebaseAdmin.js"); // Adjust the path accordingly

const adminGetUsersController = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      //  "user"👆  is set in "authenticateJWT.js"
      return await res.sendStatus(403).json({ msg: "Only for admins" }); //forbidden
    }
    const emailAccounts = await User.find();

    const listUsersResult = await firebaseAdmin.auth().listUsers();
    let firebaseAccounts = listUsersResult.users;

    allUsers = [...firebaseAccounts, ...emailAccounts];
    // Send the users as a JSON response
    res.status(200).json({ allUsers, srvFile: adminGetUsersController });
  } catch (error) {
    console.error("Error listing users:", error);

    // Handle the error and send an appropriate response
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = adminGetUsersController;

const User = require("../Schemas/UserSchema");

test it
//!test it
const adminUserDeletionController = async (req, res) => {
  try {
    const id = req.body.userIdToDelete;

    if (flag == "uid") {
      await admin.auth().deleteUser(id);
    }
    if (flag == "_id") {
      const user = await User.deleteOne({ _id: id }).exec();
      console.log(
        "🚀 ~ file: adminUserDeletionController.js:11 ~ adminUserDeletionController ~ user:",
        user
      );
    }
    console.log("Successfully deleted user");
  } catch (error) {
    console.log(
      "🚀 ~ file: adminUserDeletionController.js:5 ~ adminUserDeletionController ~ error:",
      error
    );
  }
};

module.exports = adminUserDeletionController;

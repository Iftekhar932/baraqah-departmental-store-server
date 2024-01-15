const User = require("../Schemas/UserSchema");
const admin = require("../firebase/firebaseAdmin");

const adminUserDeletionController = async (req, res) => {
  try {
    const id = req.body.userIdToDelete;
    const flag = req.body.flag;

    if (flag == "uid") {
      await admin.auth().deleteUser(id);
    }
    if (flag == "_id") {
      const findUser = await User.findOne({ _id: id }).exec();

      findUser.role == "admin"
        ? console.log("Cancelled")
        : await User.deleteOne({ _id: id }).exec();
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(
      "🚀 ~ file: adminUserDeletionController.js:22 ~ adminUserDeletionController ~ error:",
      error
    );
  }
};

module.exports = adminUserDeletionController;

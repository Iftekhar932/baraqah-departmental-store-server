const adminUserDeletionController = async (req, res) => {
  try {
    console.log("🍎🍎🍎🍎🍎🍎🍎🍎🍎");
    console.log(req.body.userIdToDelete);
    // await admin.auth().deleteUser(id);
  } catch (error) {
    console.log(
      "🚀 ~ file: adminUserDeletionController.js:5 ~ adminUserDeletionController ~ error:",
      error
    );
  }
};

module.exports = adminUserDeletionController;

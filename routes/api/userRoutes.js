const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    createUser,
    deleteUser,
    updateUser,
    newFriend,
    deleteFriend
} = require('../../controllers/userController');

// get users and create 

router.route("/")
.get(geAllUsers)
.post(createUser);

// get, delete and update by using its id //

router.route("/:userId")
.get(getOneUser)
.put(updateUser)
.delete(deleteUser);

// add friends and remove //

router.route("/:userId/friends/:friendId")
.post(addFriend)
.delete(removeFriend);

module.exports = router;



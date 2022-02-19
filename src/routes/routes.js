const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// GET all messages
router.get("/all-messages", controller.getAllMessages);

// GET all chats
router.get("/all-chats", controller.getAllChats);

// GET this user's chats
router.get("/chats/:user_id", controller.getThisUsersChats);

// GET this user's contacts
router.get("/contacts/:user_id", controller.getThisUsersContacts);

// GET this chat
router.get("/chat/:c_id", controller.getThisChat);

// GET all messages from this chat
router.get("/all-messages/:c_id", controller.getThisChatMessages);

// CREATE a new user
router.post("/register", controller.createNewUser)

// CREATE a new message
router.post("/:c_id", controller.addNewMessage)




module.exports = router;
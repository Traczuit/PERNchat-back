const bcrypt = require("bcrypt");
const pool = require("../config/db.config");
const flash = require("../../index");
// const chatApp = require("../services/service");

async function getAllMessages(req, res, next) {
  try {
    const allMessages = await pool.query("SELECT * FROM messages");
    res.json(allMessages.rows);
  } catch (err) {
    console.error(err.message);
  }
}

async function getAllChats(req, res, next) {
  try {
    const allChats = await pool.query("SELECT * FROM chat");
    res.json(allChats.rows);
  } catch (err) {
    console.error(err.message);
  }
}

async function getThisUsersChats(req, res, next) {
  try {
    const { user_id } = req.params;
    const thisUserChats = await pool.query(
      "SELECT * FROM chat WHERE user_one = $1 OR user_two = $1",
      [user_id]
    );
    res.json(thisUserChats.rows);
  } catch (err) {
    console.error(err.message);
  }
}

async function getThisUsersContacts(req, res, next) {
  try {
    const { user_id } = req.params;
    const thisUserContacts = await pool.query(
      "SELECT * FROM contacts WHERE user_id = $1",
      [user_id]
    );
    res.json(thisUserContacts.rows);
  } catch (err) {
    console.error(err.message);
  }
}

async function getThisChat(req, res, next) {
  try {
    const { c_id } = req.params;
    const thisChat = await pool.query("SELECT * FROM chat WHERE c_id = $1", [
      c_id,
    ]);
    res.json(thisChat.rows);
  } catch (err) {
    console.error(err.message);
  }
}

async function getThisChatMessages(req, res, next) {
  try {
    const { c_id } = req.params;
    console.log(c_id);
    const thisChatMessages = await pool.query(
      "SELECT * FROM messages WHERE chat_id = $1",
      [c_id]
    );
    res.json(thisChatMessages.rows);
  } catch (err) {
    console.error(err.message);
  }
}

async function createNewUser(req, res, next) {
  const { name, email, password, password2 } = req?.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters long" });
  }

  if (password != password2) {
    errors.push({ message: "Passwords do not match" });
  }
  if (errors > 0) {
    res.render("register", { errors });
  } else {
    let hashedPassword = await bcrypt.hash(password, 10);

    pool.query(
      "SEELCT * FROM users WHERE email= $1",
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        if (results.rows.length > 0) {
          errors.push({ message: "Email already registered" });
          res.render("register", { errors });
        } else {
          pool.query(
            "INSERT INTO users (username, email, usr_password) VALUES ($1, $2, $3) RETURNING id, password",
            [name, email, hashedPassword],
            err,
            (results) => {
              if (err) {
                throw err;
              }
              req.flash("success_msg", "you are now registered. Please log in");
              res.redirect("/login");
            }
          );
        }
      }
    );
  }
}

async function addNewMessage(req, res, next) {
  try {
    const { c_id } = req.params;
    const { author, seen, msg_content } = req?.body;
    const newMessage = await pool.query(
      "INSERT INTO messages (author, posted_time, seen, msg_content, chat_id) VALUES($1, CURRENT_TIMESTAMP, $2, $3, $4) RETURNING *",
      [author, seen, msg_content, c_id]
    );

    res.json(newMessage.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  getAllMessages,
  getAllChats,
  getThisUsersChats,
  getThisUsersContacts,
  getThisChat,
  getThisChatMessages,
  createNewUser,
  addNewMessage,
};

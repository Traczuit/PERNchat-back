const express = require("express");
const cors = require("cors");
const session = require("express-session");
const flash = require("express-flash"); 
const pool = require("./src/config/db.config");
const router = require("./src/routes/routes");

const app = express();
const PORT = /* proces.env. PORT ||  */ 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/pshare", router);

app.use(
  session({
    secret: "secret",
    resave: false, 
    saveUninitialized: false
  })
);

app.use(flash())
// Create a new user
/* app.post(, (req, res) => {
  try {
    
  } catch (err) {
    console.error(err.message)
  }
}) */

// Add a new contact
/* app.post("?from={usr1}&to={usr2}", async (req, res) => {
  try {
    const { from, to } = req.params;
    const newChat = await pool.query(
      `
    DO $$
    BEGIN

    IF EXISTS (SELECT * FROM chat WHERE (user_one = $1 AND user_two = $2) OR (user_one = $2 AND user_two = $1)) THEN
      raise notice 'Esta conversación ya existe';
    ELSE
      INSERT INTO chat (user_one, user_two) VALUES ($1, $2);
    END IF;
    END $$;
    `,
      [from, to]
    );

    res.json(newChat.rows);
  } catch (err) {
    console.error(err.message);
  }
}); */
// Create a new contact (add a contact)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = flash
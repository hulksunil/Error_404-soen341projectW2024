const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();
const PORT = 8080;

const dbURI =
  "mongodb+srv://admin:soen341password@soen341cluster.kdvm7y4.mongodb.net/soen341_error404db?retryWrites=true&w=majority";

// Connecting to the database
mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// Creating a user when the user goes to /createUser url
app.get("/createUser", (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName: "John",
    lastName: "Doe",
    accType: "admin",
    email: "mrJohnDoe@email.com",
    hashedPass: "password123",
  });

  // Saving the user to the database (asynchronous operation)
  user.save().then((result) => {
    console.log(result);

    // Sending the result to the client
    res.send(result);
  });
});

// Listening to the server (might need to place into the then() of the connect method to ensure the server only starts after the database is connected)
app.listen(PORT, () => {
  console.log(
    `Go to http://localhost:${PORT}/mainBackend to see the server running`
  );
  console.log(`Go to http://localhost:${PORT}/createUser to create a user`);
  console.log(`Press CTRL + C to stop server`);
});

// ========================================================
// SOME TEST CODE (Can ignore if you want)
app.get("/mainBackend", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("Congrats, you got node.js to run on port 3000");
});

app.post("/mainBackend", (req, res) => {
  console.log(req);
  res.send("Data received. You sent a post to the server at /mainBackend");
});

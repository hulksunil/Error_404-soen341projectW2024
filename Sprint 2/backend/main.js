const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

const PORT = 8080;

// Middleware to parse the body of the request (to get the data from the client)
app.use(express.urlencoded());

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

// Reading a user information when the user goes to /users/{user_id} url
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  User.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("Error in finding a user\n" + err);
    });
});

// Get all users
app.get("/users", (req, res) => {
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("Error in finding all users.\n" + err);
    });
});

// Update a user
app.get("/updateUser", (req, res) => {
  // Update the user with the given id
  const id = req.body.id;
  User.findByIdAndUpdate(id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    accType: req.body.accType,
    email: req.body.email,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete a user
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
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

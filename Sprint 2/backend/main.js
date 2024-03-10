const express = require("express");
const mongoose = require("mongoose");
const UserDB = require("./models/user");
const cors = require("cors"); // This solves an error of cross site scripting
const bodyParser = require("body-parser"); // This allows the data to be taken
const crypto = require("crypto"); // this is for hashing the password


const ReservationDB = require("./models/res");
const VehicleDB = require("./models/vehicle");
const app = express();

const PORT = 8080;

// Middleware to parse the body of the request (to get the data from the client)
app.use(express.urlencoded());
app.use(cors());
app.use(bodyParser.json());

const dbURI =
  "mongodb+srv://admin:soen341password@soen341cluster.kdvm7y4.mongodb.net/soen341_error404db?retryWrites=true&w=majority";

// Connecting to the database
mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// ROUTES
// Creating a user when the user goes to /createUser url
app.post("/createUser", (req, res) => {
  //check if the user email exsists already in the db
  const hash = crypto.createHash("sha256");

  const userInfo = req.body;

  hash.update(userInfo.password);
  const hashedPassword = hash.digest("hex");

  const createdUser = UserDB.createUser(
    userInfo.fname,
    userInfo.lname,
    userInfo.accType,
    userInfo.email,
    hashedPassword,
    userInfo.licenseNum,
    userInfo.dob
  );

  // Saving the user to the database (asynchronous operation)
  createdUser.then((result) => {
    // Sending the result to the client
    res.send(result);
  });
});

// Reading a user information when the user goes to /users/{user_id} url
app.post("/users/:id", (req, res) => {
  const id = req.params.id;

  user = UserDB.findUserById(id);
  user
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("Error in finding a user\n" + err);
    });
});

// Get all users
app.get("/users", (req, res) => {
  users = UserDB.findAllUsers();
  users
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("Error in finding all users.\n" + err);
    });
});

// Update a user
app.post("/updateUser", (req, res) => {
  // Update the user with the given id
  const id = req.body._id;
  const newUserInfo = req.body;

  updatedUser = UserDB.updateUser(
    id,
    newUserInfo.firstName,
    newUserInfo.lastName,
    newUserInfo.accType,
    newUserInfo.email,
    newUserInfo.hashedPass,
    newUserInfo.licenseNum,
    newUserInfo.dob,
    newUserInfo.reservations
  );
  updatedUser
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
  deletedUser = UserDB.deleteUser(id);

  deletedUser
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/findUserByEmail", (req, res) => {
  const userInfo = req.body;
  const hash = crypto.createHash("sha256");

  hash.update(userInfo.password);
  const hashedPasswordAttempt = hash.digest("hex");

  const searchedUser = UserDB.findUserByEmail(userInfo.email);

  searchedUser.then((result) => {
    if (result.length > 0) {
      const hashedPassword = result[0].hashedPass;

      if (hashedPassword === hashedPasswordAttempt) {
        // Sending the result to the client
        res.send(result[0]);
      } else {
        res.send({
          ERROR: "INCORRECT",
        });
      }
    } else {
      res.send({
        ERROR: "INCORRECT",
      });
    }
  });
});

const userM = new mongoose.Types.ObjectId(123);
const idM = new mongoose.Types.ObjectId(123456);
// Create a reservation
app.get("/CreateReservation", (req, res) => {
  const createdReservation = ReservationDB.createReservation(
    userM,
    idM,
    new Date(2024, 2, 28, 13, 30),
    new Date(2024, 3, 5, 18, 40),
    "Montreal"
  );
  createdReservation.then((result) => {
    console.log(result);
    res.send(result);
  });
});
// Get reservations
app.get("/reservations", (req, res) => {
  reservations = ReservationDB.findAllReservations();
  reservations
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("Error finding all reservations.\n" + err);
    });
});

// Reading a reservation by ID
app.get("/reservations/:id", (req, res) => {
  const id = req.params.id;
  reservation = ReservationDB.findReservationById(id);
  reservation
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("Error in finding the reservation\n" + err);
    });
});

// Update a reservation by ID
app.put("/UpdateReservation", (req, res) => {
  const id = req.body.id;
  updatedReservation = ReservationDB.updateReservation(
    id,
    userM,
    idM,
    new Date(2024, 3, 20, 14, 20),
    new Date(2024, 4, 10, 8, 30),
    "Montreal"
  );
  updatedReservation
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Deleting a reservation by ID
app.delete("/reservations/:id", (req, res) => {
  const id = req.params.id;
  deletedReservation = ReservationDB.deleteReservation(id);

  deletedReservation
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

//Creating a vehicle
app.get("/createVehicle", (req, res) => {
  const createVehicle = VehicleDB.createVehicle(
    "Subaru",
    "Hatchback",
    "Manual",
    "5",
    "Gas"
  );

  // Saving the vehicle to the database
  createVehicle.then((result) => {
    console.log(result);

    // Sending the result to the client
    res.send(result);
  });
});

app.get("/vehicles/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  vehicle = VehicleDB.findVehicleById(id);
  user
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("Error in finding the selected vehicle\n" + err);
    });
});

app.get("/vehicles", (req, res) => {
  vehicle = VehicleDB.findAllVehicles();
  vehicle
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("Error in finding all vehicles.\n" + err);
    });
});

app.get("/updateVehicle", (req, res) => {
  // Update the vehicle with the given id
  const id = req.body.id;
  updateVehicle = VehicleDB.updateVehicle(
    id,
    "Tesla",
    "Sedan",
    "Automatic",
    "2",
    "Electric"
  );
  updateVehicle
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/vehicles/:id", (req, res) => {
  const id = req.params.id;
  deleteVehicle = VehivleDB.deleteVehicle(id);

  deleteVehicle
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

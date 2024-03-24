const express = require("express");
const mongoose = require("mongoose");
const UserDB = require("./models/user");
const cors = require("cors"); // This solves an error of cross site scripting
const bodyParser = require("body-parser"); // This allows the data to be taken
const crypto = require("crypto"); // this is for hashing the password

const ReservationDB = require("./models/res");
const VehicleDB = require("./models/vehicle");
const BranchDB = require("./models/branch");

const CheckoutDB = require('./models/checkout');
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
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(
        `Go to http://localhost:${PORT}/mainBackend to see the server running`
      );

      console.log(`Press CTRL + C to stop server`);
    });
  })
  .catch((err) => console.log(err));

// ROUTES
// ======================================================== USER ROUTES ========================================================
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
    userInfo.address,
    userInfo.contactNum,
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

  const newPassword = newUserInfo.newPass;

  if (newPassword.length != 0) {
    // if the newPassword is defined, hash it, determine if its the same as prev then assign it if its new

    const hash = crypto.createHash("sha256");
    hash.update(newPassword);
    const newHashedPassword = hash.digest("hex");
    if (newUserInfo.hashedPass !== newHashedPassword) {
      newUserInfo.hashedPass = newHashedPassword;
    }
  }

  updatedUser = UserDB.updateUser(
    id,
    newUserInfo.firstName,
    newUserInfo.lastName,
    newUserInfo.accType,
    newUserInfo.email,
    newUserInfo.hashedPass,
    newUserInfo.licenseNum,
    newUserInfo.address,
    newUserInfo.contactNum,
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
      // find all reservations with this user id and mark them as deleted
      ReservationDB.deleteReservationsMatchingUser(id).then(
        (deletedReservations) => {
          res.send(result);
        }
      );
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

// ======================================================== RESERVATION ROUTES ========================================================
const mockUserId = new mongoose.Types.ObjectId("65ee0f0f1fd06cc2bafdaeb2");
const mockCarId = new mongoose.Types.ObjectId("65ee83437dc4c984bb37ab4e");
// Create a reservation
app.post("/CreateReservation", (req, res) => {
  // Extract reservation data from request body
  const { userId, carId, reservationDate, returnDate, location,returnLocation,Additionalservices} = req.body;
  console.log("Received reservation data:", req.body);
  // Create reservation in the database
  const createdReservation = ReservationDB.createReservation(
    userId,
    carId,
    reservationDate,
    returnDate,
    location,
    returnLocation,
    Additionalservices
  );

  // Handle promise result
  createdReservation
    .then((result) => {
      UserDB.addReservation(userId, result._id).then((newUser) => {
        VehicleDB.addReservation(carId, result._id).then((newVehicle) => {
          // console.log(newUser);
          // console.log(newVehicle);

          // Send success response to client
          res.send(result);
        });
      });
    })
    .catch((error) => {
      // Handle error
      console.error("Error creating reservation:", error);
      res.status(500).send("Error creating reservation.");
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
app.put("/UpdateReservation/:id", (req, res) => {
  const id = req.params.id;
  const updatedReservationData = req.body; // Data sent from the frontend

  // Call the updateReservation function with the received data
  updatedReservation = ReservationDB.updateReservation(
    id,
    updatedReservationData.userId,
    updatedReservationData.carId,
    updatedReservationData.reservationDate,
    updatedReservationData.returnDate,
    updatedReservationData.location,
    updatedReservationData.returnLocation,
    updatedReservationData.Additionalservices,
  );

  updatedReservation
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error updating reservation.");
    });
});

// Deleting a reservation by ID
app.delete("/reservations/:id", (req, res) => {
  const id = req.params.id;
  deletedReservation = ReservationDB.deleteReservation(id);

  deletedReservation
    .then((result) => {
      UserDB.removeReservation(result.userId, id).then(
        (deletedReservationUserId) => {
          VehicleDB.removeReservation(result.carId, id).then(
            (deletedReservationVehicleId) => {
              res.send(result);
            }
          );
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
});

// ======================================================== VEHICLE ROUTES ========================================================
//Creating a vehicle
app.post("/createVehicle", (req, res) => {
  
  const vehicleInfo = req.body;

  const createdVehicle = VehicleDB.createVehicle(
      vehicleInfo.model, 
      vehicleInfo.type, 
      vehicleInfo.transmission, 
      vehicleInfo.numberOfSeats, 
      vehicleInfo.fuelType, 
      vehicleInfo.url, 
      vehicleInfo.rentalPrice, 
      vehicleInfo.hasBluetooth, 
      vehicleInfo.drivetrain,
      vehicleInfo.year,
      vehicleInfo.licensePlate,
      vehicleInfo.color,
      vehicleInfo.branchId,
  );

  // Saving the vehicle to the database
  createdVehicle.then((result) => {
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

app.post("/updateVehicle", (req, res) => {
  // Update the vehicle with the given id
  const newVehicleInfo = req.body;

  updateVehicle = VehicleDB.updateVehicle(
    newVehicleInfo._id,
    newVehicleInfo.model,
    newVehicleInfo.type,
    newVehicleInfo.transmission,
    newVehicleInfo.numberOfSeats,
    newVehicleInfo.fuelType,
    newVehicleInfo.url,
    newVehicleInfo.rentalPrice,
    newVehicleInfo.hasBluetooth,
    newVehicleInfo.drivetrain,
    newVehicleInfo.year,
    newVehicleInfo.licensePlate,
    newVehicleInfo.color,
    newVehicleInfo.branchId,
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
  deleteVehicle = VehicleDB.deleteVehicle(id);

  deleteVehicle
    .then((result) => {
      // find all reservations with this vehicle id and mark them as deleted
      ReservationDB.deleteReservationsMatchingVehicle(id).then(
        (deletedReservations) => {
          res.send(result);
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });

    //============================================================CHECKOUT DB===========================================================
});

//Create a checkout
app.post("/CreateCheckout", (req, res) => {
  
  const { reservationId, trait, action } = req.body;
  console.log("Received checkout data:", req.body);
  const createdCheckout = CheckoutDB.createCheckout(
    reservationId,
    trait,
    action
  );

  createdCheckout
    .then((result) => {
      
    })
    .catch((error) => {
      // Handle error
      console.error("Error creating checkout:", error);
      res.status(500).send("Error creating checkout.");
    });
});
//Call all checkouts
  app.get("/checkout", (req, res) => {
    checkouts = CheckoutDB.findAllCheckouts();
    checkouts
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log("Error finding all checkouts.\n" + err);
      });
  });
  // Call a checkout by id
  // Reading a reservation by ID
app.get("/checkout/:id", (req, res) => {
  const id = req.params.id;
  checkout = CheckoutDB.findCheckoutById(id);
  checkout
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("Error in finding the checkout\n" + err);
    });
});

// ========================================================
// Deleting all checkouts
app.delete("/deleteCheckouts", (req, res) => {
  CheckoutDB.deleteAllCheckouts()
    .then(() => {
      res.status(200).send("All checkouts deleted successfully.");
    })
    .catch((err) => {
      console.error("Error deleting all checkouts:", err);
      res.status(500).send("Error deleting all checkouts.");
    });
});

// ======================================================== BRANCH ROUTES ========================================================

app.get("/createBranch", (req, res) => {
  const branchInfo = req.body;

  const createBranch = BranchDB.createBranch(branchInfo.locationName,branchInfo.lat,branchInfo.long);

  createBranch.then((result) => {
    res.send(result);
  });
});

app.get("/branches",(req,res)=>{
  branches = BranchDB.findAllBranches();
  branches
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.log("Error in finding all branches.\n" + err);
  });
});



// ========================================================================================================================
// SOME TEST CODE (Can ignore if you want)
app.get("/mainBackend", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("Congrats, you got node.js to run on port 3000");
});

app.post("/mainBackend", (req, res) => {
  console.log(req);
  res.send("Data received. You sent a post to the server at /mainBackend");
});

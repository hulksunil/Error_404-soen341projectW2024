const express = require("express");
const mongoose = require("mongoose");
const ReservationDB = require("./models/res");

const app = express();
const PORT = 8080;

app.use(express.urlencoded());

const dbURI =  "mongodb+srv://admin:soen341password@soen341cluster.kdvm7y4.mongodb.net/soen341_error404testdb?retryWrites=true&w=majority";

mongoose.connect(dbURI)
  .then(() => console.log("Connected to DB"))
  .catch(err => console.error("Error connecting to DB:", err));


// Create a reservation
app.get("/CreateReservation", (req, res) => {
    const createdReservation = ReservationDB.createReservation(
        "Steve Collins",
        "123456",
        new Date(2024, 2, 28, 13, 30),
        new Date(2024, 3, 5, 18, 40),
        "Montreal"
      );
      createdReservation.then((result)=> {
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
    console.log(id);
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
      "Kevin Collins",
        "121234",
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

// Starting server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Go to http://localhost:${PORT}/createReservation to create a reservation`);
  console.log(`Press CTRL + C to stop server`);
});

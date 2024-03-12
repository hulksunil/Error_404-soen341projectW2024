import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styles/App.css";
import Home from "../Home.tsx";
import Browse from "../Browse.tsx";
import ViewRes from "../ViewReservation.tsx";
import CarRentalPayment from "../Payment_form.js";
import CarRentalReservation from "../create_a_reservation.js";
import TransactionApproved from "../Transaction_approved.js";
import Payment from "../Payment_form.js";
import AdminView from "../AdminView.tsx";
import ModifyUsers from "../ModifyUsers.tsx";
import ModifyVehicles from "../ModifyVehicles.tsx";
import ModifyReservations from "../ModifyReservartions.tsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />{" "}
          {/*This initilizes what the initial page will be*/}
          {/* This defines a url path that will route the user to the CreateUser.tsx page*/}
          <Route path="/browse" element={<Browse />} />
          <Route path="/viewreservation" element={<ViewRes />} />
          <Route path="/payment" element={<CarRentalPayment />} />
          <Route path="/reservation" element={<CarRentalReservation />} />
          <Route
            path="/transactionapproved"
            element={<TransactionApproved />}
          />
          <Route path="/adminview" element={<AdminView />} />
          <Route path="/modifyusers" element={<ModifyUsers />} />
          <Route path="/modifycars" element={<ModifyVehicles />}/>
          <Route path="/modifyreservations" element={<ModifyReservations />} />
        

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

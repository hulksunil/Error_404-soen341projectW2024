import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styles/App.css";
import Home from "../Home.tsx";
import Browse from "../Browse.tsx";
import ViewRes from "../ViewReservation.tsx";
import CarRentalPayment from "../Payment_form.js";
import CarRentalReservation from "../create_a_reservation.js";
import TransactionApproved from "../Transaction_approved.js";
import AdminView from "../AdminView.tsx";
import ModifyUsers from "../ModifyUsers.tsx";
import ModifyVehicles from "../ModifyVehicles.tsx";
import ModifyReservations from "../ModifyReservartions.tsx";
import FindBranch from "../FindBranch.tsx";
import CheckOut from "../CheckOut.tsx";
import CSRView from "../CSRVIew.tsx";
import CheckoutRedirect from "../CheckoutRedirect.tsx";
import ViewCheckouts from "../ViewCheckouts.tsx";
import RentalAgreement from "../car_rentral_agreement.js";
import CheckInForm from "../check-in.js";
import CheckInApproved from "../check-in_approved.js";
import EmailTemplate from "../EmailTemplate.tsx";
import AboutUs from "../AboutUs.tsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />{" "}
          {/*This initilizes what the initial page will be*/}
          {/* This defines a url path that will route the user to the CreateUser.tsx page*/}
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/browse/:branchId" element={<Browse />} />
          <Route path="/viewreservation" element={<ViewRes />} />
          <Route path="/payment" element={<CarRentalPayment />} />
          <Route path="/reservation" element={<CarRentalReservation />} />
          <Route
            path="/transactionapproved"
            element={<TransactionApproved />}
          />
          <Route path="/adminview" element={<AdminView />} />
          <Route path="/modifyusers" element={<ModifyUsers />} />
          <Route path="/modifycars" element={<ModifyVehicles />} />
          <Route path="/modifyreservations" element={<ModifyReservations />} />
          <Route path="/findbranch" element={<FindBranch />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/csrview" element={<CSRView />} />
          <Route
            path="/checkoutredirect/:reservationId"
            element={<CheckoutRedirect />}
          />
          <Route path="/view-checkouts" element={<ViewCheckouts />} />
          <Route
            path="/car_rental_agreement/:reservationId"
            element={<RentalAgreement />}
          />
          <Route path="/check_in" element={<CheckInForm />} />
          <Route
            path="/approved_check-in/:carId"
            element={<CheckInApproved />}
          />
          <Route path="/temp" element={<EmailTemplate />} />
        </Routes>
      </BrowserRouter>
      <footer>
        <span>&copy; Team Error404</span>
      </footer>
    </div>
  );
}

export default App;

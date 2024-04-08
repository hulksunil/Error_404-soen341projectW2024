import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styles/App.css";
import Home from "../Home.tsx";
import Browse from "../Browse.tsx";
import ViewRes from "../ViewReservation.tsx";
import CarRentalPayment from "../PaymentForm.tsx";
import CarRentalReservation from "../CreateReservation.jsx";
import TransactionApproved from "../TransactionApproved.tsx";
import CheckoutApproved from "../CheckoutApproved.js";
import AdminView from "../AdminView.tsx";
import ModifyUsers from "../ModifyUsers.tsx";
import ModifyVehicles from "../ModifyVehicles.tsx";
import ModifyReservations from "../ModifyReservartions.tsx";
import FindBranch from "../FindBranch.tsx";
import CheckOut from "../CheckOut.tsx";
import CSRView from "../CSRVIew.tsx";
import CheckoutRedirect from "../CheckoutRedirect.tsx";
import ViewCheckouts from "../ViewCheckouts.tsx";
import RentalAgreement from "../CarRentralAgreement.tsx";
import CheckInForm from "../CheckIn.tsx";
import CheckInApproved from "../CheckinApproved.tsx";
import EmailTemplate from "../EmailTemplate.tsx";
import AboutUs from "../AboutUs.tsx";
import FeedbackForm from "../FeedbackForm.tsx";
import CheckoutPayment from "../CheckoutPayment.js"

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
          <Route path="/checkoutpayment" element={<CheckoutPayment />} />
          <Route path="/reservation" element={<CarRentalReservation />} />
          <Route
            path="/transactionapproved"
            element={<TransactionApproved />}
          />
          <Route
            path="/checkoutapproved"
            element={<CheckoutApproved />}
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
          <Route path="/feedback" element={<FeedbackForm />} />{" "}
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

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../styles/App.css'
import Home from '../pages/Home.tsx'
import Browse from '../pages/Browse.tsx'
import ViewRes from '../pages/ViewReservation.tsx'
import CarRentalPayment from '../pages/PaymentForm.tsx'
import CarRentalReservation from '../pages/CreateReservation.jsx'
import TransactionApproved from '../pages/TransactionApproved.tsx'
import CheckoutApproved from '../pages/CheckoutApproved.tsx'
import AdminView from '../pages/AdminView.tsx'
import ModifyUsers from '../pages/ModifyUsers.tsx'
import ModifyVehicles from '../pages/ModifyVehicles.tsx'
import ModifyReservations from '../pages/ModifyReservartions.tsx'
import FindBranch from '../pages/FindBranch.tsx'
import CheckOut from '../pages/CheckOut.tsx'
import CSRView from '../pages/CSRVIew.tsx'
import CheckoutRedirect from '../pages/CheckoutRedirect.tsx'
import ViewCheckouts from '../pages/ViewCheckouts.tsx'
import RentalAgreement from '../pages/CarRentralAgreement.tsx'
import CheckInForm from '../pages/CheckIn.tsx'
import CheckInApproved from '../pages/CheckinApproved.tsx'
import EmailTemplate from '../pages/EmailTemplate.tsx'
import AboutUs from '../pages/AboutUs.tsx'
import FeedbackForm from '../pages/FeedbackForm.tsx'
import CheckoutPayment from '../pages/CheckoutPayment.tsx'

function App () {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />{' '}
          {/* This initilizes what the initial page will be */}
          {/* This defines a url path that will route the user to the CreateUser.tsx page */}
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/browse' element={<Browse />} />
          <Route path='/browse/:branchId' element={<Browse />} />
          <Route path='/viewreservation' element={<ViewRes />} />
          <Route path='/payment' element={<CarRentalPayment />} />
          <Route path='/checkoutpayment' element={<CheckoutPayment />} />
          <Route path='/reservation' element={<CarRentalReservation />} />
          <Route
            path='/transactionapproved'
            element={<TransactionApproved />}
          />
          <Route
            path='/checkoutapproved'
            element={<CheckoutApproved />}
          />
          <Route path='/adminview' element={<AdminView />} />
          <Route path='/modifyusers' element={<ModifyUsers />} />
          <Route path='/modifycars' element={<ModifyVehicles />} />
          <Route path='/modifyreservations' element={<ModifyReservations />} />
          <Route path='/findbranch' element={<FindBranch />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/csrview' element={<CSRView />} />
          <Route
            path='/checkoutredirect/:reservationId'
            element={<CheckoutRedirect />}
          />
          <Route path='/view-checkouts' element={<ViewCheckouts />} />
          <Route
            path='/car_rental_agreement/:reservationId'
            element={<RentalAgreement />}
          />
          <Route path='/check_in' element={<CheckInForm />} />
          <Route
            path='/approved_check-in/:carId'
            element={<CheckInApproved />}
          />
          <Route path='/feedback' element={<FeedbackForm />} />{' '}
          <Route path='/temp' element={<EmailTemplate />} />
        </Routes>
      </BrowserRouter>
      <footer>
        <span>&copy; Team Error404</span>
      </footer>
    </div>
  )
}

export default App

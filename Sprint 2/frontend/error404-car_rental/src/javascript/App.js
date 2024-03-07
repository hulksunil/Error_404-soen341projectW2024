import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../styles/App.css';
import CreateUser from '../CreateUser.tsx';
import Home from '../Home.tsx';
import Browse from '../Browse.tsx';
import ViewRes from '../ViewReservation.tsx';
import CarRentalPayment from '../Payment_form.js';
import CarRentalReservation from '../create_a_reservation.js';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/> 
          {/*This initilizes what the initial page will be*/}
        <Route path='/createuser' element={<CreateUser/>}/> 
        {/* This defines a url path that will route the user to the CreateUser.tsx page*/}
        <Route path='/browse' element={<Browse/>}/>
        <Route path="/viewreservation" element={<ViewRes/>}/>
        <Route path="/payment" component={CarRentalPayment} />
        <Route path="/reservation" component={CarRentalReservation} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import CreateUser from './CreateUser.tsx';
import Home from './Home.tsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/> 
          {/*This initilizes what the initial page will be*/}
        <Route path='/createuser' element={<CreateUser/>}/> 
        {/* This defines a url path that will route the user to the CreateUser.tsx page*/}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

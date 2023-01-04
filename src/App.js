import './App.css';
import Login from './login/login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRegister from './user-register/user-register';
import Home from './home/home';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <ToastContainer position='bottom-right'/>
       <BrowserRouter>
        <Routes>
          <Route exact path='/Home'element={<Home/>}/>
          <Route exact path="" element={<Login />} />
          <Route exact path="/UserRegister" element={<UserRegister />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

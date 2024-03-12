import Header from "./components/Header";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import DashBoard from "./components/DashBoard";
import Error from "./components/Error"
import ForgotPassword from "./components/ContextProvider/ForgotPassword";
import PasswordReset from "./components/PasswordReset";


function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={ <Login/>}/>
      <Route path="/register" element={ <Register/>}/>
      <Route path="/dash" element={ <DashBoard/>}/>
      <Route path="*" element={ <Error/>}/>
      <Route path="/password-reset" element={<PasswordReset/>}/>
      <Route path="/forgotpassword/:id/:token" element={<ForgotPassword/>}/>

    </Routes>
    </> 
  );
}

export default App;

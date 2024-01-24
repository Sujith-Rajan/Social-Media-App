import{BrowserRouter,Route,Routes,Navigate} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home"
import Messenger from "./pages/messenger/Messenger";

function App() {
 
  const {user} = useContext(AuthContext)
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/home" element={user ? <Home/> : <Register/>} /> 
    <Route path="/" element={user ? <Home/> : <Register/>} /> 
    <Route path="/login" element={user ? <Navigate to="/"/> : <Login />} /> 
    <Route path="/register" element={user ? <Navigate to="/"/> : <Register />} /> 
    <Route path="/messenger" element={!user ? <Navigate to="/" /> : <Messenger/> } />
    <Route path="/profile/:username" element={ <Profile />} /> 
    </Routes>
   </BrowserRouter>
  );
}
export default App; 

        

      
      





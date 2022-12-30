import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile"
import SignUp from "./pages/SignUp/SignUp";
import Upload from "./pages/Upload/Upload";
import History from "./pages/History/History";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<div><NavBar/><Home/><Footer/></div>}/>
        <Route path="/about" element={<div><NavBar/><About/><Footer/></div>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<div><NavBar/><Profile/><Footer/></div>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/upload" element={<div><NavBar/><Upload/><Footer/></div>}/>
        <Route path="/history" element={<div><NavBar/><History/><Footer/></div>}/>
      </Routes>
    </Router>
  );
}

export default App;

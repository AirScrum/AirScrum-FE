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
      {<NavBar/>}
      <Routes>
        <Route path="/*" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/history" element={<History/>}/>
      </Routes>
      {<Footer/>}
    </Router>
  );
}

export default App;

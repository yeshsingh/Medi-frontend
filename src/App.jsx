import "./app.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors/Doctors";
import DoctorDetails from "./pages/Doctors/DoctorDetails"; 
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
function App() {

  return (
    <>
    <Header/>
    <main>
    <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/home" element={<Home/>}/>
         <Route path="/doctors" element={<Doctors/>}/>
         <Route path="/doctors/:id" element={<DoctorDetails/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Signup/>}/>
         <Route path="/contact" element={<Contact/>}/>
         <Route path="/services" element={<Services/>}/>
     </Routes>
    </main>
  <Footer/>
  </>
  );
};

export default App;

import { BrowserRouter ,Routes,Route, } from 'react-router-dom';
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/Login";
import Resgister from './pages/Register';
import Sources from './pages/sources';
import Calories_Nutrition_Calculator from './pages/Calories&Nutrition_Calculator';

import './App.css';


export default function App() {
  

  return (
    <BrowserRouter>
    <Navbar />
    
      
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/sources" element={<Sources />}/>
        <Route path="/Calories&Nutrition_Calculator" element={<Calories_Nutrition_Calculator />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Resgister />}/>
        
      </Routes>
    
    </BrowserRouter>
    
  );
}

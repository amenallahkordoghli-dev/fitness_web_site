import { BrowserRouter ,Routes,Route, } from 'react-router-dom';
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Sources from './pages/sources';
import Calories_Nutrition_Calculator from './pages/Calories&Nutrition_Calculator';
import Login from './pages/Login';
import Register from './pages/Register';
import Market from './pages/Market';
import Video from './pages/Video';
import './App.css';


export default function App() {
  

  return (
    
    <BrowserRouter>
    <Navbar />
    
      
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/sources" element={<Sources />}/>
        <Route path="/Calories&Nutrition_Calculator" element={<Calories_Nutrition_Calculator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/market" element={<Market/>} />
        <Route path="/Video" element={<Video/>} />
      </Routes>
    
    </BrowserRouter>
    
  );
}

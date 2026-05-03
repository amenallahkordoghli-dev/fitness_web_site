import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from "./pages/produit/CartContext";
import CartDrawer from "./pages/produit/CartDrawer";

import { useContext } from 'react';
import { AuthContext } from "./context/AuthContext";


import Navbar from "./components/navbar";
import Notification from "./components/Notification";

import Home from "./pages/home";
import Login from "./pages/Login";
import Register from './pages/Register';
import Sources from './pages/Sources';
import Profile from './pages/Profile';
import Calories_Nutrition_Calculator from './pages/Calories&Nutrition_Calculator';
import Coach from './pages/Coach';

import VideosCategory from './pages/video/video';
import VideoPage from "./pages/video/VideoPage";
import { videoData } from "./pages/video/videoData";

import ProductsApp from "./pages/produit/ProductsApp";

import AdminProduits from "./pages/produit/AdminProduits"; 
import AdminVideos from './pages/video/videoAdmin';
import AdminCoachRequests from './pages/adminCoachRequest';
import AdminNavbar from "./components/navbarAdmin";
import AdminRoute from './AdminRoute';

import './App.css';

export default function App() {
  const { user} = useContext(AuthContext);
  return (
    <CartProvider>
      <BrowserRouter>
        {user?.role === "admin" ? <AdminNavbar /> : <Navbar />}
        <Notification />
        <CartDrawer />

        <Routes>
          {/* Pages générales */}
          <Route path="/" element={<Home />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/Calories&Nutrition_Calculator" element={<Calories_Nutrition_Calculator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Coach" element={<Coach />} />

          {/* Vidéos */}
          <Route path="/video" element={<VideosCategory />} />
          <Route path="/video/musculation"  element={<VideoPage {...videoData.musculation} />} />
          <Route path="/video/cardio"       element={<VideoPage {...videoData.cardio} />} />
          <Route path="/video/healthfood"   element={<VideoPage {...videoData.healthfood} />} />
          <Route path="/video/mentalhealth" element={<VideoPage {...videoData.mentalhealth} />} />

          {/* Boutique */}
          <Route path="/produit"    element={<ProductsApp />} />
          <Route path="/produitapp" element={<ProductsApp />} />

          {/* admin */}
          <Route path="/adminProduit" element={<AdminRoute> <AdminProduits /> </AdminRoute>} />
          <Route path="/adminVideo" element={<AdminRoute><AdminVideos /> </AdminRoute>} />
          <Route path='/adminCoachRequest'element={<AdminRoute> <AdminCoachRequests /></AdminRoute> } />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
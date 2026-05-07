import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import './../styles/navbar.css';
import { useNavigate } from "react-router-dom";
import { useCart } from "../pages/produit/CartContext";

export default function Navbar() {
  const { user, isAuth, logout } = useContext(AuthContext);
  const navigate =useNavigate();
  const handleLogout = async () => {
    await logout();      // supprimer session
    navigate("/"); 
    fetchCart();      
  };
  return (
    <div className="header">
      <nav >
        <div className="logo" style={{ marginRight: "300px" }}></div>
        <Link to="/" className="lien">home</Link>
        <Link className="lien" to="/Calories&Nutrition_Calculator" >Calories&Nutrition_Calculator</Link>
        <Link to="/produitapp" className="lien">market</Link>
        <Link to="/video" className="lien">video</Link>
        <Link to="/sources" className="lien">sources</Link>

        {user ?
          (<>
            <Link to="/profile" className="lien" >profile</Link>
            <Link className="lien" to="/Coach">Coach</Link>
            <button on  className="register" onClick={handleLogout}>Logout</button>
            
          </>

          ) : (
            <>
              <Link className="login" to="/login" >login</Link>
              <Link className="register" to="/register" >register</Link>
              
            </>
          )
        }





      </nav>
    </div>
  );
}
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import './../styles/navbar.css';
export default function Navbaradmin() {
  const { user, isAuth, logout } = useContext(AuthContext);
   const Navigate =useNavigate();
  const handleLogout = async () => {
    await logout();      // supprimer session
    navigate("/");       // 🔥 redirection vers Home
  };
  return (
    <div className="header">
      <nav >
        {user ?
          (<>
            <Link to="/adminProduit" className="lien" >produits</Link>
            <Link className="lien" to="/adminVideo">video</Link>
            <Link className="lien" to="/adminCoachRequest">coachRequests</Link>
            <button className="register" onClick={handleLogout}>Logout</button>
            
          </>

          ) : (
            <>
              
            </>
          )
        }





      </nav>
    </div>
  );
}
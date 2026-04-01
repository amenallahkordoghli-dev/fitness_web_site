import {Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import './../styles/navbar.css';
export default function Navbar(){
    const {isAuth,logout}=useContext(AuthContext);
    return(
        <div className="header">
        <nav >
            <div className="logo"style={{marginRight:"400px"}}></div>
            <Link to="/" className="lien">home</Link>
            <Link className="lien" to="/Calories&Nutrition_Calculator" >Calories&Nutrition_Calculator</Link>
            <Link to="/market" className="lien">market</Link>
            <Link to="/video" className="lien">video</Link>
            <Link to="/sources" className="lien">sources</Link>

          {isAuth ?
          (<>
            <Link to="/profile" className="lien" >profile</Link>
            <button className="register" onClick={logout}>Legout</button>
          </>

          ):(
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
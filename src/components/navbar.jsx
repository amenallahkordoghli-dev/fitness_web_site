import {Link} from "react-router-dom";
import './../styles/navbar.css';
export default function Navbar(){
    return(
        <div className="header">
        <nav >
            <div className="logo"style={{marginRight:"400px"}}></div>
            <Link to="/" className="lien">home</Link>
            
            <Link className="lien" to="/Calories&Nutrition_Calculator" >Calories&Nutrition_Calculator</Link>
            <Link to="/market" className="lien">market</Link>
            <Link to="/video" className="lien">video</Link>
            <Link to="/profile" className="lien" style={{display:"none"}}>profile</Link>
            <Link to="/sources" className="lien">sources</Link>
            <Link className="login" to="/login" >login</Link>
            <Link className="register" to="/register" >register</Link>
        </nav>
        </div>
    );
}
import { useState } from "react";
import { useCart } from "../pages/produit/CartContext";

import './../styles/Login.css';
import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
function Image()
{
    return(
        <div className="Image">
            <img src="https://res.cloudinary.com/dtdnbgbrp/image/upload/v1776876660/png_dllgil.png"
            ></img>
        </div>
    )
}
const Form = ({handleChange,handleSubmit}) => {
    const navigate=useNavigate();
    const handleRegister=()=>{
        
        navigate('/register');
    }
  return (
    <StyledWrapper>

      <form className="form"onSubmit={handleSubmit}>
        <p id="heading">Login</p>
        <div className="field">
          <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
          </svg>
          <input onChange={handleChange}  autoComplete="off" name="email" placeholder="email" className="input-field" type="email" />
        </div>
        <div className="field">
          <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          </svg>
          <input  onChange={handleChange} name="password" placeholder="Password" className="input-field" type="password" />
        </div>
        <div className="btn">
          <button className="button1"type="submit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
          <button className="button2" type="button"onClick={handleRegister}>Sign Up</button>
        </div>
        
      </form>
    </StyledWrapper>
  );
}
function Elem1(){
    
    const [form,setForm]=useState({email:"",
                                    password:""
                                      });
    const handleChange=(e)=>{
            setForm({
                ... form ,
                [e.target.name]:e.target.value


            })
    }
const { login } = useContext(AuthContext);
const navigate = useNavigate();
const { showNotification } = useContext(NotificationContext);
const { fetchCart } = useCart();
const handleSubmit = async (e) => {
  e.preventDefault();

  const { email, password } = form;

  if (!email || !password) {
    alert("Invalid login");
    return;
  }

  try {
   const response = await fetch("http://localhost:5000/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "include", // <--- AJOUTE CETTE LIGNE ICI
  body: JSON.stringify({ email, password })
});

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // utiliser AuthContext
    login(data.user);
    await fetchCart();
    //  redirect selon role
    if (data.user.role === "admin") {
      navigate("/admin");
    } 
     
    else {
      navigate("/");
    }

  } catch (error) {
    showNotification(error.message);
  }
};
    return(
        <div className="elem1">
            <h2>welcome back</h2>
            <p>please log in to your account.</p>
            <Form handleChange={handleChange} handleSubmit={handleSubmit}/>
        </div>
    )
}


export default function Login()
{
    return(
        <div className="container">
            <Elem1 />
            <Image/>
            
        </div>
    )
}
const StyledWrapper = styled.div`
  .form {
  display: flex;
  flex-direction: column;
  /* Espacement uniforme entre les éléments du formulaire */
  gap: 20px; 
  
  /* Padding équilibré pour la respiration interne */
  padding: 40px;
  
  /* Couleur de fond sombre avec une légère transparence pour le style */
  background-color: rgba(18, 18, 18, 0.9);
  backdrop-filter: blur(5px); /* Effet de flou sur le fond pour le luxe */
  
  /* Bordure subtile pour définir le formulaire sur le fond noir */
  border: 1px solid #2a2a2a;
  border-radius: 20px;
  
  /* Transition fluide */
  transition: all .4s ease-in-out;
  
  /* Marges externes */
  margin-top: 40px;
  margin-left: 30px;
  
  /* Largeur max pour éviter qu'il ne soit trop étiré sur grand écran */
  max-width: 400px;
  width: 100%;
}

/* Optionnel : Effet au survol pour plus d'interactivité */
.form:hover {
  border-color: #E91E63; /* Rappel du rose/magenta de l'image */
  box-shadow: 0 0 20px rgba(233, 30, 99, 0.1);
}

  

  #heading {
    text-align: center;
    margin: 2em;
    color: rgb(255, 255, 255);
    font-size: 1.2em;
  }

  .field {
  display: flex;
  align-items: center;
  gap: 1em;
  border-radius: 12px; /* Un peu moins arrondi pour un look plus moderne */
  padding: 0.8em 1.2em;
  background-color: #1a1a1a; /* Un gris légèrement plus clair que le fond */
  border: 1px solid #2a2a2a;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem; /* Remplacement du 10% (trop variable) */
}

/* Effet focus : quand on clique dans le champ */
.field:focus-within {
  border-color: #ff007f; /* Magenta de l'image */
  box-shadow: 0 0 8px rgba(255, 0, 127, 0.2);
}

.input-icon {
  height: 1.1em;
  width: 1.1em;
  fill: #888; /* Icônes plus discrètes par défaut */
  transition: fill 0.3s ease;
}

.field:focus-within .input-icon {
  fill: #ff007f; /* L'icône s'illumine en rose au focus */
}

.input-field {
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: #ffffff;
  font-size: 0.95rem;
}

/* --- Le Groupe de Boutons --- */
.form .btn {
  display: flex;
  gap: 15px; /* Utilisation de gap plutôt que margin-right */
  margin-top: 1rem;
}

.button1, .button2 {
  flex: 1; /* Les boutons prennent la même largeur */
  padding: 0.8em;
  border-radius: 8px;
  border: none;
  outline: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease;
}

/* Bouton Connexion (Principal) */
.button1 {
  background-color: #ff007f; /* Rappel de la lumière rose de la photo */
  color: white;
}

.button1:hover {
  background-color: #d10068;
  transform: translateY(-2px); /* Petit effet de levée */
}

/* Bouton Sign Up (Secondaire) */
.button2 {
  background-color: transparent;
  color: #ff007f;
  border: 1px solid #ff007f;
}

.button2:hover {
  background-color: rgba(255, 0, 127, 0.1);
  color: white;
}`;
import React from 'react';
import './../styles/Login.css';
import styled from 'styled-components';
import { useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../context/NotificationContext";
const Form = ({loading,handleChange,handleSubmit}) => {
  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register </p>
        
        <div className="flex">
          <label>
            <input onChange={handleChange} name="firstName" pattern="[A-Za-zÀ-ÿ\s]+" className="input" type="text" placeholder required />
            <span>Firstname</span>
          </label>
          <label>
            <input onChange={handleChange}  name='lastName' pattern="[A-Za-zÀ-ÿ\s]+" className="input" type="text" placeholder required />
            <span>Lastname</span>
          </label>
        </div>  
        
        <label>
          <input onChange={handleChange} name="email" className="input" type="email" placeholder required />
          <span>Email</span>
        </label> 
        <label>
          <input onChange={handleChange} name="phone" maxLength={8} pattern='[0-9]{8}' required className="input" type="tel" placeholder="" />
          <span>Phone </span>
      </label>
        <label>
          <input onChange={handleChange} name="password"  className="input" type="password" placeholder required />
          <span>Password</span>
        </label>
        <label>
          <input onChange={handleChange} name="confirmPassword" className="input" type="password" placeholder required />
          <span>Confirm password</span>
        </label>
        <label>
      <textarea onChange={handleChange} name="bio" className="input textarea" placeholder=""required></textarea>
      <span>Bio </span>
    </label>
        <label>
          <input onChange={handleChange} name="photoProfile" className="input" type="file"accept='image/*' placeholder required />
          <span>photoProfile</span>
        </label>
        
        <button disabled={loading} className="submit">
        {loading ? "Loading..." : "Submit"}
        </button>
        
      </form>
    </StyledWrapper>
  );
}
function Elem1(){
  const [form,setForm]=useState({firstName:"",
                           lastName:"",
                           email:"",
                           password:"",
                           confirmPassword:"",
                           phone:"",
                          bio:"",
                           photoProfile: null
                           
  })
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
  const { name, value, files } = e.target;
  
  if (name === "photoProfile") {
    setForm({
      ...form,
      photoProfile: files[0] // on a changer le chemin de fichier par fichier réel
    });
  } else {
    setForm({
      ...form,
      [name]: value
    });
  }
};
  const navigate=useNavigate();
  const {login}=useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phone,
    bio,
    photoProfile
  } = form;

  if (password !== confirmPassword) {
    showNotification("Password mismatch");
    return;
  }
  if (!photoProfile) {
  showNotification("Image required");
  return;
}

  try {
    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("bio", bio);
    formData.append("image", photoProfile);

    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    setLoading(false);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Register failed");
    }

    
     login(data.user);
    navigate("/");

  } catch (error) {
    showNotification(error.message);
  }
};

    return(
        <div className="elem1">
            <h2>join our fitness community</h2>
            <p>create your account and start tracking your workouts calories,and fitness progress.</p>
            <Form loading={loading} handleChange={handleChange} handleSubmit={handleSubmit}/>
        </div>
    )
}
const StyledWrapper = styled.div`
  .form {
  display: grid; /* On passe en grid au lieu de flex */
  grid-template-columns: 1fr 1fr; /* On crée 2 colonnes égales */
  gap: 15px;
  max-width: 550px; /* On élargit un peu pour tenir les 2 colonnes */
  padding: 30px;
  background-color: rgba(20, 20, 20, 0.9);
  border-radius: 20px;
  margin-left: auto; /* Centrage */
  margin-right: auto;
}
  .title, 
.form > label:nth-child(4), /* Email */
.form > label:nth-child(8), /* Bio */
.form > label:nth-child(9), /* Photo */
.submit {
  grid-column: span 2;
}

/* On ajuste la Bio pour qu'elle ne soit pas trop haute */
.textarea {
  min-height: 60px;
  height: 80px;
}

.title {
  font-size: 26px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 35px;
  color: #ff007f; /* Magenta néon */
  margin-bottom: 25px;
}

.title::before,
.title::after {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  border-radius: 4px; /* Carré arrondi pour un look plus technique */
  left: 0px;
  background-color: #ff007f;
  box-shadow: 0 0 10px #ff007f;
}

.title::after {
  animation: pulse 1.5s infinite;
}

.form label {
  position: relative;
  width: 100%;
}

.form label .input {
  background-color: #252525;
  color: #fff;
  width: 100%;
  padding: 25px 15px 10px 15px; /* Plus d'espace pour le texte */
  outline: 0;
  border: 1px solid #333;
  border-radius: 12px;
  transition: all 0.3s ease;
  margin-bottom:10px;
}

/* Effet au focus sur l'input */
.form label .input:focus {
  border-color: #ff007f;
  background-color: #2a2a2a;
}

.form label .input + span {
  color: #888;
  position: absolute;
  left: 15px;
  top: 15px;
  font-size: 0.9em;
  transition: 0.3s ease;
  pointer-events: none;
}

/* Animation du label flottant */
.form label .input:focus + span,
.form label .input:valid + span {
  color: #ff007f;
  top: 6px;
  font-size: 0.75em;
  font-weight: 700;
  text-transform: uppercase;
}

.submit {
  border: none;
  outline: none;
  padding: 15px;
  margin-top: 10px;
  border-radius: 12px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .3s ease;
  /* Dégradé rappelant les néons de la salle */
  background: linear-gradient(135deg, #ff007f 0%, #8000ff 100%);
  box-shadow: 0 4px 15px rgba(255, 0, 127, 0.3);
}

.submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 0, 127, 0.5);
  filter: brightness(1.1);
}

@keyframes pulse {
  from { transform: scale(0.9); opacity: 1; }
  to { transform: scale(2); opacity: 0; }
}
  .form label .textarea {
  min-height: 80px; /* Donne une hauteur initiale */
  resize: vertical; /* Permet à l'utilisateur d'agrandir seulement en hauteur */
  padding-top: 30px; /* Laisse de la place pour le texte du span flottant */
  font-family: inherit;
}

/* Ajustement pour que le label flottant fonctionne aussi sur la textarea */
.form label .textarea:focus + span,
.form label .textarea:valid + span,
.form label .textarea:not(:placeholder-shown) + span {
  color: #ff007f;
  top: 6px;
  font-size: 0.75em;
  font-weight: 700;
}
`;




function Image()
{
    return(
        <div className="Image">
            <img src="https://res.cloudinary.com/dtdnbgbrp/image/upload/v1776876660/png_dllgil.png"
            ></img>
        </div>
    )
}


export default function Resgister(){
    return(
        <div className="container">
            <Elem1 />
            <Image/>
            
        </div>
    );
}

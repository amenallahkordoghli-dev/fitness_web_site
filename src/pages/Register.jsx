import React from 'react';
import './../styles/Login.css';
import styled from 'styled-components';
import { useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({handleChange,handleSubmit}) => {
  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register </p>
        
        <div className="flex">
          <label>
            <input onChange={handleChange} name="firstName" className="input" type="text" placeholder required />
            <span>Firstname</span>
          </label>
          <label>
            <input onChange={handleChange}  name='lastName' className="input" type="text" placeholder required />
            <span>Lastname</span>
          </label>
        </div>  
        
        <label>
          <input onChange={handleChange} name="email" className="input" type="email" placeholder required />
          <span>Email</span>
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
          <input onChange={handleChange} name="photoProfile" className="input" type="file"accept='image/*' placeholder required />
          <span>photoProfile</span>
        </label>
        <label>
          <input onChange={handleChange} name="weight" className="input" type="number" placeholder required />
          <span>weight</span>
        </label>
        <label>
          <input onChange={handleChange} name="height" className="input" type="number" placeholder required />
          <span>height</span>
        </label>
        <button  className="submit">Submit</button>
        
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
                           photoProfile:"",
                           weight:"",
                           height:""
  })
  const handleChange=(e)=>{
    setForm({... form,
            [e.target.name]:e.target.value}
    )
  }
  const navigate=useNavigate();
  const {login}=useContext(AuthContext);
  const handleSubmit=(e)=>{
    e.preventDefault();
    const {firstName,lastName,email,password,confirmPassword,photoProfile,weight,height}=form;
    if(password !== confirmPassword )
    {
      alert("erreur de saisir password");
      return;
    }
    login();
    navigate('/');
    
  }

    return(
        <div className="elem1">
            <h2>join our fitness community</h2>
            <p>create your account and start tracking your workouts calories,and fitness progress.</p>
            <Form handleChange={handleChange} handleSubmit={handleSubmit}/>
        </div>
    )
}
const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    background-color: #1a1a1a;
    color: #fff;
    border: 1px solid #333;
    margin-left:60px;
    padding-bottom:100px;
  
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #00bfff;
    margin-bottom:20px;
  }

  .title::before {
    width: 18px;
    height: 18px;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: #00bfff;
  }

   
  

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
  }
.form  .input{
width: 95%;
}
  .form label .input {
    background-color: #333;
    color: #fff;
    
    padding: 20px 05px 05px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 12.5px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    color: #00bfff;
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .input {
    font-size: medium;
  }

  .submit {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
    background-color: #00bfff;
  }

  .submit:hover {
    background-color: #00bfff96;
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }`;




function Image()
{
    return(
        <div className="Image">
            <img src="https://media.canva.com/v2/image-resize/format:PNG/height:750/quality:100/uri:ifs%3A%2F%2FM%2F58fe00b6-dcf6-420f-9735-47725cc4be63/watermark:F/width:498?csig=AAAAAAAAAAAAAAAAAAAAANTUGxbRvdKZ5_ExJFaZsVAfI8v3NWKtBHj-IeX04Uf0&exp=1775068738&osig=AAAAAAAAAAAAAAAAAAAAAC18cfFK9-Yp8wQHdwmnf5TFW4Ji4yDt-vOQJxPoYHvF&signer=media-rpc&x-canva-quality=screen"
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

import React from 'react';
import {useState} from 'react'
import styled from 'styled-components';
import './../styles/Calories.css'
const Form = ({form,handleChange,handleSubmit}) => {
  const options = [
    {value:""  ,label:"Select Exercise --"},
      { value:"1.3"  ,label:"Running (Low intensity)"},
         {value:"1.6" , label:"Running (Moderate)"},
            {value:"2.0" ,label:"Running (High intensity)"},
            {value:"1.2" ,label:"Walking"},
            {value:"1.8" ,label:"Cycling (Moderate)"},
                        {value:"2.2" ,label:"Cycling (High intensity)"},
                        {value:"1.5" ,label:"Swimming (Moderate)"},
                        {value:"2.1" ,label:"Swimming (Intense)"},
                        {value:"1.7" ,label:"Weight Training"},
                        {value:"1.9" ,label:"HIIT (High intensity)"},
                        {value:"1.4" ,label:"Yoga / Pilates"},
                        {value:"1.8" ,label:"Boxing"}
  ];
  const intensites = [
    { value: "0.8",  label: "low" },
    { value: "1.0",  label: "high" },
    { value: "1.2",  label: "medium" }

  ];
  return (
    <StyledWrapper>
      <section className="add-card page">

        <form className="form" onSubmit={handleSubmit}>
          <h2>your information</h2>
          <div className='container1'>
            <label htmlFor="weight" className="label">
              <span class="title">Weight(kg)</span>
              <input onChange={handleChange} className="input-field" type="number" name="weight" title="Input title" placeholder="e.g.,75" />
            </ label>
            <label htmlFor="height" className="label">
              <span class="title">height(cm)</span>
              <input onChange={handleChange} id="height" className="input-field" type="number" name="height" title="Input title" placeholder="e.g.,125" />
            </label>
          </div>


          <label htmlFor="serialCardNumber" className="label">
            <span class="title">type exercices</span>
            <select onChange={handleChange} id="serialCardNumber" className="input-field" type="number" name="exercice" title="Input title"  >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}</option>
                
              ))}
            </select>
          </label>


          <div className="split">
            < label htmlFor="duration" className="label">
              <span className="title">duration(minute)</span>
              <input onChange={handleChange} id="duration" className="input-field" type="number" name="duration" title="Expiry Date" placeholder="e.g.,140" />
            </ label>
            < label htmlFor="intensite" className="label">
              <span className="title">intensite</span>
              <select onChange={handleChange} id="intensite" className="input-field" name="intensite" title="intensite"  >
                {intensites.map((opt) => (
                 <option key={opt.value} value={opt.value}>
                    {opt. label}</option>
                  
                ))}
              </select>
            </ label>
          </div>
          <button class="checkout-btn" type="submit"  >calculate</button>
        </form>
      </section>
    </StyledWrapper>
  );
}

function Resultat({data}) {
  
  return (
    <div class="results-card">
      <h2>Your Results</h2>

      <div class="calories-result">
        <div class="calories- label">Calories Burned</div>
        <div class="calories-value" id="caloriesValue">0</div>
        <div class="calories-unit">kcal</div>
      </div>

      <div class="nutrition-title">Daily Nutrition Need</div>
      <div class="nutrition-grid">
        <div class="nutrition-item">
          <div class="nutrition-name">Protein</div>
          <div class="nutrition-value" id="proteinValue">0</div>
          <div class="nutrition-unit">grams</div>
        </div>
        <div class="nutrition-item">
          <div class="nutrition-name">Carbs</div>
          <div class="nutrition-value" id="carbsValue">0</div>
          <div class="nutrition-unit">grams</div>
        </div>
        <div class="nutrition-item">
          <div class="nutrition-name">Fat</div>
          <div class="nutrition-value" id="fatValue">0</div>
          <div class="nutrition-unit">grams</div>
        </div>
      </div>
    </div>
  );
}





function Title() {
  return (<div>
    <h2 style={{ color: "#ff4d6d" }}>Calories & Nutrition Calculator</h2>
    <p>Discover exactly how many calories you
      burn and get personalized nutrition recommendations based on your workout</p>

  </div>
  );
}
export default function Calories_Nutrition_Calculator() {
  const [form,setForm] =useState({weight:"",
                                  height:"",
                                  exercice:"",
                                  duration:"",
                                  intensite:""
  })
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  return (

    <div>
      <Title />
      <div className='container'>
        < Form form={form} handleChange={handleChange} handleSubmit={handleSubmit}/>
        <Resultat data={form}/>
      </div>


    </div>
  );
}
const StyledWrapper = styled.div`
  .form {
    background: linear-gradient(135deg, rgba(26, 10, 46, 0.8) 0%, rgba(15, 8, 21, 0.8) 100%);
    box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01),
      0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09),
      0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    margin-top:30px;
    margin-left:20px;
    position: relative;
    border-radius: 25px;
    height:600px;
    backdrop-filter: blur(10px);
            box-shadow: 0 20px 60px rgba(217, 70, 239, 0.15);
  }
    .container1 {
  display: flex;            /* aligne les enfants sur une ligne */
  justify-content: center;  /* centre horizontalement */
  align-items: flex-start;  /* aligne verticalement en haut */
  gap: 10px;                /* espace entre les éléments */
}
  
  .form .label {
    display: flex;
    flex-direction: column;
    gap: 5px;
    height: -moz-fit-content;
    height: fit-content;
    background:transparent;
  }
  .form .label:has(input:focus) .title {
    top: 0;
    left: 0;
    color: #d17842;
  }
  .form .label .title {
    padding: 0 10px;
    transition: all 300ms;
    font-size: 12px;
    color: #8b8e98;
    font-weight: 600;
    width: -moz-fit-content;
    width: fit-content;
    top: 14px;
    position: relative;
    left: 15px;
    background: transparent;
  }
  .form .input-field {
  
    width: 97%;
    height: 50px;
    text-indent: 15px;
    border-radius: 15px;
    outline: none;
    background-color: black;
    border: 1px solid #21262e;
    transition: all 0.3s;
    caret-color: #d17842;
    color: #aeaeae;
  }

  .form .input-field:hover {
    border-color: rgba(209, 121, 66, 0.5);
  }

  .form .input-field:focus {
    border-color: #d17842;
  }
  .form .split {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    gap: 15px;
  }
  .form .split  label {
    width: 130px;
  }
  .form .checkout-btn {
    margin-top: 20px;
    padding: 20px 0;
    border-radius: 25px;
    font-weight: 700;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
    cursor: pointer;
    font-size: 20px;
    font-weight: 500;
    display: flex;
    align-items: center;
    border: none;
    justify-content: center;
    fill: #fff;
    color: #fff;
    border: 2px solid transparent;
    background: #e13491;
    transition: all 200ms;
  }
  .form .checkout-btn:active {
    scale: 0.95;
  }
    h2{
    color:#e13491}

  .form .checkout-btn:hover {
    color: #d17842;
    border: 2px solid #d17842;
    background: transparent;
  }`;
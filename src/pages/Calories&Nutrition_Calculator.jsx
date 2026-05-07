import {useEffect,useState} from 'react'
import styled from 'styled-components';
import './../styles/Calories.css';
import { NotificationContext } from "../context/NotificationContext";
import { useContext } from "react";

const Form = ({loading,handleChange,handleSubmit}) => {

 const [options, setOptions] = useState([
  { value: "", label: "Select Exercise --" }
]);
useEffect(() => {
  const fetchTraining = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/calcul/training",{
        method:"GET",
        headers: {
            "Content-Type": "application/json"
          },
      });
      const data = await res.json();

      const formatted = data.map((item) => ({
        value: item.id,
        label: item.name
      }));

      setOptions([
        { value: "", label: "Select Exercise --" },
        ...formatted
      ]);

    } catch (error) {
      console.error("Error fetching training:", error);
    }
  };

  fetchTraining();
}, []);
  
  const intensites = [
    { value: "",  label: "select intensite" },
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
              <span className="title">Weight(kg)</span>
              <input onChange={handleChange} min={"0"} className="input-field" type="number" name="weight" title="Input title" placeholder="e.g.,75" />
            </ label>
            <label htmlFor="height" className="label">
              <span className="title">height(cm)</span>
              <input onChange={handleChange} min={"0"} id="height" className="input-field" type="number" name="height" title="Input title" placeholder="e.g.,125" />
            </label>
          </div>


          <label htmlFor="serialCardNumber" className="label">
            <span className="title">type exercices</span>
            <select onChange={handleChange} id="serialCardNumber" className="input-field" type="number" name="exercice" title="Input title"  >
              {options.map((opt) => (
                <option key={opt.label} value={opt.value}>
                  {opt.label}</option>
                
              ))}
            </select>
          </label>


          <div className="split">
            < label htmlFor="duration" className="label">
              <span className="title">duration(minute)</span>
              <input onChange={handleChange} min={"0"} id="duration" className="input-field" type="number" name="duration" title="Expiry Date" placeholder="e.g.,140" />
            </ label>
            < label htmlFor="intensite" className="label">
              <span className="title">intensite</span>
              <select onChange={handleChange} id="intensite" className="input-field" name="intensite" title="intensite"  >
                {intensites.map((opt) => (
                 <option key={opt.label} value={opt.value}>
                    {opt.label}</option>
                  
                ))}
              </select>
            </ label>
          </div>
          <button disabled={loading} className="checkout-btn" type="submit"  >calculate</button>
        </form>
      </section>
    </StyledWrapper>
  );
}

function Resultat({result}) {
  let Calorie=0,protein=0,cabs=0,fat=0;
  if(result){
      Calorie=result.calories;
      protein=result.protein;
      cabs=result.carbs;
      fat=result.fat;
  }
  
  return (
    <div className="results-card">
      <h2>Your Results</h2>

      <div className="calories-result">
        <div className="calories- label">Calories Burned</div>
        <div className="calories-value" id="caloriesValue">{Calorie}</div>
        <div className="calories-unit">kcal</div>
      </div>

      <div className="nutrition-title">Daily Nutrition Need</div>
      <div className="nutrition-grid">
        <div className="nutrition-item">
          <div className="nutrition-name">Protein</div>
          <div className="nutrition-value" id="proteinValue">{protein}</div>
          <div className="nutrition-unit">grams</div>
        </div>
        <div className="nutrition-item">
          <div className="nutrition-name">Carbs</div>
          <div className="nutrition-value" id="carbsValue">{cabs}</div>
          <div className="nutrition-unit">grams</div>
        </div>
        <div className="nutrition-item">
          <div className="nutrition-name">Fat</div>
          <div className="nutrition-value" id="fatValue">{fat}</div>
          <div className="nutrition-unit">grams</div>
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
  });
  const [loading, setLoading] = useState(false);
  const [result,setResult] =useState(null);
  const { showNotification } = useContext(NotificationContext);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const calculate=async(form)=>{
    const{weight,height,exercice,duration,intensite}=form;
    if(!weight || !height || !exercice || !duration || !intensite)
    {
      alert('Please fill in all fields');
      return null;
    }
    // MET Formula: Calories = (MET × Weight × Duration) / 60
    try{
      
      const response = await fetch("http://localhost:5000/api/calcul/",{
        method:"POST",
         headers: {
          "Content-Type": "application/json",
          },
        body: JSON.stringify({
        TrainingId: exercice,
        duration,
        weight,
        height,
        intensity: intensite,
        }),
        credentials: "include",

      });
      const data = await response.json();
      if (!response.ok) {
      throw new Error(data.message || "calcule failed");
    };
    return data;
    }catch(error){
        showNotification(error.message);
    }
  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true);
    const res=await calculate(form);
    setResult(res);
    setLoading(false);
  };
  return (

    <div>
      <Title />
      <div className='container'>
        < Form loading={loading}  handleChange={handleChange} handleSubmit={handleSubmit}/>
        <Resultat result={result}/>
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
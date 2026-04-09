import React, { useState } from 'react';
import './../styles/Profile.css';

function Profile_header({profilePhoto, formData,handleUploadPhoto ,setActiveTab}){
   return (
         <div className="profile-header">
          {/* Photo Section */}
          <div className="profile-photo-section">
            <div 
              className="profile-photo" 
              style={typeof profilePhoto === 'string' && profilePhoto.startsWith('data:') ? 
                { backgroundImage: `url(${profilePhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' } : 
                {}
              }
              onClick={handleUploadPhoto}
            >
              {typeof profilePhoto === 'string' && !profilePhoto.startsWith('data:') ? 
                profilePhoto : 
                <span></span>
              }
              <div className="profile-photo-overlay" onClick={handleUploadPhoto}>
                📷
              </div>
            </div>
            <div className="upload-text">Cliquez pour<br/>changer photo</div>
          </div>

          {/* Info Section */}
          <div className="profile-info">
            <div className="profile-name">{formData.firstName} {formData.lastName}</div>
            <div className="profile-email">{formData.email}</div>
            

          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              className="btn-edit" 
              onClick={() => setActiveTab('edit')}
            >
              ✏️ Modifier Profil
            </button>
            <button className="btn-settings" onClick={() => setActiveTab('settings')}>
              ⚙️ Paramètres
            </button>
          </div>
        </div>
        </div>
    );
}
function Tabs({activeTab ,setActiveTab}){
   return( <div className="tabs-container">
          <button 
            className={`tab-button ${activeTab === 'edit' ? 'active' : ''}`}
            onClick={() => setActiveTab('edit')}
          >
            📝 Modifier Infos
          </button>
          <button 
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            📊 Historique
          </button>
          <button 
            className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Paramètres
          </button>
        </div>
   )
}
function Tab1({ activeTab,setActiveTab,formData,handleInputChange ,handleSaveProfile}){
    return(
        <>
        {activeTab === 'edit' && (
          <div className="tab-content active">
            <form className="edit-form" onSubmit={handleSaveProfile}>
              <div className="form-group">
                <label className="form-label">Prénom</label>
                <input 
                  type="text" 
                  className="form-input" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Votre prénom"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nom</label>
                <input 
                  type="text" 
                  className="form-input" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Votre nom"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Votre email"
                />
              </div>

              

              <div className="form-buttons">
                <button type="button" className="btn-cancel" onClick={() => setActiveTab('edit')}>
                  Annuler
                </button>
                <button type="submit" className="btn-save">
                  💾 Enregistrer
                </button>
              </div>
            </form>
          </div>
        )}</>
    )
}
function Tab3({handleChange,activeTab, handleSaveSettings}){
    return(
        <>
        {activeTab === 'settings' && (
          <div className="tab-content active">
            <form className="edit-form" onSubmit={handleSaveSettings}>
             

              <div className="form-group form-group-full" style={{marginTop: '30px'}}>
                <label className="form-label">🔐 Sécurité</label>
              </div>

              <div className="form-group form-group-full">
                <label className="form-label">Mot de passe</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="Nouveau mot de passe"
                  name='password'
                  onChange={handleChange}
                />
              </div>

              <div className="form-group form-group-full">
                <label className="form-label">Confirmer mot de passe</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="Confirmer mot de passe"
                  name="confirmPassword"
                  onChange={handleChange}
                />
              </div>

              <div className="form-buttons">
                <button type="button" className="btn-cancel">
                  Annuler
                </button>
                <button type="submit" className="btn-save">
                  💾 Enregistrer
                </button>
              </div>
            </form>
          </div>
        )}

        </>
    )
}
function Tab2({activeTab, historyData}){
    return(
        <>
        {activeTab === 'history' && (
          <div className="tab-content active">
            <div className="history-grid">
              {historyData.map((item, index) => (
                <div key={index} className="history-card">
                  <div className="history-date">📅 {item.date}</div>
                  <div className="history-title">{item.title}</div>
                  <div className="history-content">
                    <div className="history-item">
                      <div className="history-item-label">⏱️ Durée</div>
                      <div className="history-item-value">{item.duration}</div>
                    </div>
                    <div className="history-item">
                      <div className="history-item-label">🔥 Calories</div>
                      <div className="history-item-value">{item.calories}</div>
                    </div>
                    <div className="history-item">
                      <div className="history-item-label">💪 Intensité</div>
                      <div className="history-item-value">{item.intensity}</div>
                    </div>
                    
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        )}</>
    )
}
const Profile = () => {
  const [activeTab, setActiveTab] = useState('edit');
  const [profilePhoto, setProfilePhoto] = useState('👤');
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@fitness.com'
  });
  const [password,setPasswod]=useState({password:"",confirmPassword:""})
  const handleChange=(e)=>{
            setPasswod({
                ... password ,
                [e.target.name]:e.target.value


            })
    }
  const [notification, setNotification] = useState(null);

  const historyData = [
    {
      date: "08 Avril 2024",
      title: "Full Body HIIT",
      duration: "35 min",
      calories: "450 kcal",
      intensity: "Élevée",
    },
    {
      date: "07 Avril 2024",
      title: "Yoga Flow",
      duration: "45 min",
      calories: "180 kcal",
      intensity: "Modérée",
    },
    {
      date: "06 Avril 2024",
      title: "Upper Body Strength",
      duration: "52 min",
      calories: "320 kcal",
      intensity: "Élevée",
    },
    {
      date: "05 Avril 2024",
      title: "Running Training",
      duration: "44 min",
      calories: "380 kcal",
      intensity: "Élevée",
    },
    {
      date: "04 Avril 2024",
      title: "Core & Abs",
      duration: "30 min",
      calories: "220 kcal",
      intensity: "Modérée",
    },
    {
      date: "03 Avril 2024",
      title: "Leg Day",
      duration: "48 min",
      calories: "350 kcal",
      intensity: "Élevée",
    }
  ];

  const handleUploadPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          setProfilePhoto(event.target.result);
          showNotification('Photo de profil mise à jour ! ✓');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showNotification('Profil mis à jour avec succès ! ✓');
    setTimeout(() => {
      setActiveTab('edit');
    }, 500);
  };

 const handleSaveSettings = (e) => {
  e.preventDefault();

  const { password: pass, confirmPassword } = password;

  if (pass !== confirmPassword) {
    alert("Mot de passe invalide !");
    return;
  }

  showNotification('Paramètres enregistrés ! ✓');
};
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="profile-page">
      {/* CONTAINER */}
      <div className="profile-container">

        {/* PROFILE HEADER */}
       <Profile_header profilePhoto={profilePhoto} formData={formData} handleUploadPhoto={handleUploadPhoto} setActiveTab={setActiveTab}/>

        {/* TABS */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} handleInputChange={handleInputChange} handleSaveProfile={handleSaveProfile}/>
        

        {/* TAB 1: EDIT INFO */}
        <Tab1 activeTab={activeTab} setActiveTab={setActiveTab} formData={formData} handleInputChange={handleInputChange} handleSaveProfile={handleSaveProfile}/>

        {/* TAB 2: HISTORY */}
        <Tab2 activeTab={activeTab} historyData={historyData}/>
        
        {/* TAB 3: SETTINGS */}
        <Tab3 handleChange={handleChange} activeTab={activeTab} handleSaveSettings={handleSaveSettings}/>
      </div>

      {/* NOTIFICATION */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Profile;
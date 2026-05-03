import React, { useState, useEffect } from 'react';
import './../styles/Profile.css';

const API = 'http://localhost:5000';

// ─── Profile Header ──────────────────────────────────────────────────────────
function Profile_header({ profilePhoto, formData, handleUploadPhoto, setActiveTab }) {
  return (
    <div className="profile-header">
      <div className="profile-photo-section">
        <div
          className="profile-photo"
          style={
            profilePhoto && (profilePhoto.startsWith('http') || profilePhoto.startsWith('data:'))
              ? { backgroundImage: `url(${profilePhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              : {}
          }
          onClick={handleUploadPhoto}
        >
          {profilePhoto && !profilePhoto.startsWith('http') && !profilePhoto.startsWith('data:')
            ? profilePhoto
            : <span></span>
          }
          <div className="profile-photo-overlay" onClick={handleUploadPhoto}>📷</div>
        </div>
        <div className="upload-text">Cliquez pour<br />changer photo</div>
      </div>

      <div className="profile-info">
        <div className="profile-name">{formData.firstName} {formData.lastName}</div>
        <div className="profile-email">{formData.email}</div>
        <div className="action-buttons">
          <button className="btn-edit" onClick={() => setActiveTab('edit')}>✏️ Modifier Profil</button>
          <button className="btn-settings" onClick={() => setActiveTab('settings')}>⚙️ Paramètres</button>
        </div>
      </div>
    </div>
  );
}

// ─── Tabs ────────────────────────────────────────────────────────────────────
function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs-container">
      <button className={`tab-button ${activeTab === 'edit' ? 'active' : ''}`} onClick={() => setActiveTab('edit')}>
        📝 Modifier Infos
      </button>
      <button className={`tab-button ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
        📊 Historique
      </button>
      <button className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
        ⚙️ Paramètres
      </button>
    </div>
  );
}

// ─── Tab 1 : Edit Info ───────────────────────────────────────────────────────
function Tab1({ activeTab, setActiveTab, formData, handleInputChange, handleSaveProfile }) {
  return (
    <>
      {activeTab === 'edit' && (
        <div className="tab-content active">
          <form className="edit-form" onSubmit={handleSaveProfile}>
            <div className="form-group">
              <label className="form-label">Prénom</label>
              <input type="text" className="form-input" name="firstName"
                value={formData.firstName} onChange={handleInputChange} placeholder="Votre prénom" />
            </div>

            <div className="form-group">
              <label className="form-label">Nom</label>
              <input type="text" className="form-input" name="lastName"
                value={formData.lastName} onChange={handleInputChange} placeholder="Votre nom" />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" name="email"
                value={formData.email} onChange={handleInputChange} placeholder="Votre email" />
            </div>

            <div className="form-group">
              <label className="form-label">Téléphone</label>
              <input type="text" className="form-input" name="phone"
                value={formData.phone} onChange={handleInputChange} placeholder="Votre téléphone" />
            </div>

            <div className="form-group form-group-full">
              <label className="form-label">Bio</label>
              <textarea className="form-input" name="bio" value={formData.bio}
                onChange={handleInputChange} placeholder="Votre bio" rows={3} style={{ resize: 'vertical' }} />
            </div>

            <div className="form-buttons">
              <button type="button" className="btn-cancel" onClick={() => setActiveTab('edit')}>Annuler</button>
              <button type="submit" className="btn-save">💾 Enregistrer</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

// ─── Tab 2 : History (API réelle) ────────────────────────────────────────────
function Tab2({ activeTab }) {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);

  useEffect(() => {
    if (activeTab !== 'history') return;   // charge seulement quand l'onglet est ouvert

    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API}/api/calcul/history`, {
          method: 'GET',
          credentials: 'include',          // 🍪
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setHistoryData(data);
      } catch {
        setError("❌ Impossible de charger l'historique");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [activeTab]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const intensityLabel = (val) => {
    if (val <= 0.5) return 'Faible';
    if (val <= 1)   return 'Modérée';
    return 'Élevée';
  };

  return (
    <>
      {activeTab === 'history' && (
        <div className="tab-content active">

          {loading && <p style={{ textAlign: 'center', padding: '20px' }}>Chargement...</p>}
          {error   && <p style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</p>}

          {!loading && !error && historyData.length === 0 && (
            <p style={{ textAlign: 'center', padding: '20px' }}>Aucun historique disponible.</p>
          )}

          {!loading && !error && historyData.length > 0 && (
            <div className="history-grid">
              {historyData.map((item) => (
                <div key={item.id} className="history-card">
                  <div className="history-date">📅 {formatDate(item.createdAt)}</div>
                  <div className="history-title">{item.Training?.name || 'Entraînement'}</div>
                  <div className="history-content">
                    <div className="history-item">
                      <div className="history-item-label">⏱️ Durée</div>
                      <div className="history-item-value">{item.duration} min</div>
                    </div>
                    <div className="history-item">
                      <div className="history-item-label">🔥 Calories</div>
                      <div className="history-item-value">{item.calories} kcal</div>
                    </div>
                    <div className="history-item">
                      <div className="history-item-label">💪 Intensité</div>
                      <div className="history-item-value">{intensityLabel(item.intensity)}</div>
                    </div>
                    <div className="history-item">
                      <div className="history-item-label">🥩 Protéines</div>
                      <div className="history-item-value">{item.protein} g</div>
                    </div>
                    <div className="history-item">
                      <div className="history-item-label">🍞 Glucides</div>
                      <div className="history-item-value">{item.carbs} g</div>
                    </div>
                    <div className="history-item">
                      <div className="history-item-label">🫒 Lipides</div>
                      <div className="history-item-value">{item.fat} g</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ─── Tab 3 : Settings ────────────────────────────────────────────────────────
function Tab3({ passwordForm,handleChange, activeTab, handleSaveSettings }) {
  return (
    <>
      {activeTab === 'settings' && (
        <div className="tab-content active">
          <form className="edit-form" onSubmit={handleSaveSettings}>
            <div className="form-group form-group-full" style={{ marginTop: '30px' }}>
              <label className="form-label">🔐 Sécurité</label>
            </div>

            <div className="form-group form-group-full">
              <label className="form-label">Mot de passe</label>
              <input type="password" className="form-input"  value={passwordForm.password}  placeholder="Nouveau mot de passe"
                name="password" onChange={handleChange} />
            </div>

            <div className="form-group form-group-full">
              <label className="form-label">Confirmer mot de passe</label>
              <input type="password" className="form-input" placeholder="Confirmer mot de passe"
                name="confirmPassword" value={passwordForm.confirmPassword} onChange={handleChange} />
            </div>

            <div className="form-buttons">
              <button type="button" className="btn-cancel">Annuler</button>
              <button type="submit" className="btn-save">💾 Enregistrer</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

// ─── Main Profile Component ──────────────────────────────────────────────────
const Profile = () => {
  const [activeTab, setActiveTab] = useState('edit');
  const [profilePhoto, setProfilePhoto] = useState('👤');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
  });
  const [passwordForm, setPasswordForm] = useState({ password: '', confirmPassword: '' });
  const [notification, setNotification] = useState(null);

  // ── Chargement du profil au montage ────────────────────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API}/api/profile/`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) throw new Error();

        const data = await res.json();

        setFormData({
          firstName: data.firstName || '',
          lastName:  data.lastName  || '',
          email:     data.email     || '',
          phone:     data.phone     || '',
          bio:       data.bio       || '',
        });

        if (data.profilePhoto) setProfilePhoto(data.profilePhoto);

      } catch {
        showNotification('❌ Impossible de charger le profil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ── Mise à jour du profil ───────────────────────────────────────────────────
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/profile/`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();
      showNotification('Profil mis à jour avec succès ! ✓');
    } catch {
      showNotification('❌ Erreur lors de la mise à jour du profil');
    }
  };

  // ── Mise à jour du mot de passe ─────────────────────────────────────────────
  // handleSaveSettings
const handleSaveSettings = async (e) => {
  e.preventDefault();
  if (passwordForm.password !== passwordForm.confirmPassword) {
    alert('Les mots de passe ne correspondent pas !');
    return;
  }
  try {
    const res = await fetch(`${API}/api/profile/password`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(passwordForm),   // ← passwordForm au lieu de password
    });
    if (!res.ok) throw new Error(await res.text());
    showNotification('Mot de passe mis à jour ! ✓');
    setPasswordForm({ password: '', confirmPassword: '' });  // ← reset
  } catch (err) {
    showNotification(`❌ ${err.message}`);
  }
};

  // ── Upload de la photo ──────────────────────────────────────────────────────
  const handleUploadPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => setProfilePhoto(event.target.result);
      reader.readAsDataURL(file);

      try {
        const formDataImg = new FormData();
        formDataImg.append('image', file);

        const res = await fetch(`${API}/api/profile/image`, {
          method: 'PUT',
          credentials: 'include',
          body: formDataImg,
        });

        if (!res.ok) throw new Error();
        const data = await res.json();

        if (data.image) setProfilePhoto(data.image);
        showNotification('Photo de profil mise à jour ! ✓');
      } catch {
        showNotification("❌ Erreur lors de l'upload de la photo");
      }
    };

    input.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => {
   
  const { name, value } = e.target;
  setPasswordForm(prev => ({ ...prev, [name]: value }));
};
 

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-container">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <Profile_header
          profilePhoto={profilePhoto}
          formData={formData}
          handleUploadPhoto={handleUploadPhoto}
          setActiveTab={setActiveTab}
        />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <Tab1
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSaveProfile={handleSaveProfile}
        />
        <Tab2 activeTab={activeTab} />
        <Tab3 passwordForm={passwordForm}  handleChange={handleChange} activeTab={activeTab} handleSaveSettings={handleSaveSettings} />
      </div>

      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default Profile;
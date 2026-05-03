import React, { useState, useEffect } from 'react';
import '../styles/Coach.css';

const Coach = () => {
  const [activeTab, setActiveTab] = useState('request');
  const [notification, setNotification] = useState(null);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    
    message: ''
  });

  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Fetch Coachs from API
  useEffect(() => {
    fetchCoachs();
  }, []);
  
  const fetchCoachs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/profile/coachs', {
        method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include"
      });
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des coachs');
      }
      const data = await response.json();
      setCoaches(data);
    } catch (err) {
      setError(err.message);
      showNotification('Erreur : ' + err.message + ' ⚠️');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitRequest = async (e) => {
  e.preventDefault();

  if (!formData.message) {
    showNotification('Veuillez remplir tous les champs ! ⚠️');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/coachRequest/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de l\'envoi de la demande');
    }

    showNotification('Votre demande a été envoyée avec succès ! ✓');
    setRequestSubmitted(true);

    setTimeout(() => {
      setFormData({ message: '' });
      setRequestSubmitted(false);
    }, 2000);

  } catch (err) {
    showNotification('Erreur : ' + err.message + ' ⚠️');
  }
};

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="coach-page">
      {/* PAGE HEADER */}
      <div className="coach-page-header">
        <h1>Nos Coachs</h1>
        <p>Trouvez le coach parfait pour atteindre vos objectifs fitness</p>
      </div>

      {/* CONTAINER */}
      <div className="coach-container">

        {/* TABS */}
        <div className="coach-tabs-container">
          <button 
            className={`coach-tab-button ${activeTab === 'request' ? 'active' : ''}`}
            onClick={() => setActiveTab('request')}
          >
            📝 Devenir Coach
          </button>
          <button 
            className={`coach-tab-button ${activeTab === 'available' ? 'active' : ''}`}
            onClick={() => setActiveTab('available')}
          >
            👥 Coachs Disponibles
          </button>
        </div>

        {/* TAB 1: COACH REQUEST */}
        {activeTab === 'request' && (
          <div className="coach-tab-content active">
            <div className="coach-request-section">
              <div className="request-header">
                <h2>Devenir Coach FUSION</h2>
                <p>Partagez votre passion pour le fitness et aidez d'autres à atteindre leurs objectifs</p>
              </div>

              {!requestSubmitted ? (
                <form className="coach-request-form" onSubmit={handleSubmitRequest}>
                
                    
                 

                  <div className="form-group form-group-full">
                    <label className="form-label">Message de présentation *</label>
                    <textarea 
                      className="form-textarea"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Présentez-vous, parlez de votre expérience, vos certifications, vos objectifs en tant que coach..."
                      rows="8"
                    />
                  </div>

                  <div className="form-note">
                    <strong>ℹ️ Note :</strong> Notre équipe examinera votre demande dans les 48 heures et vous contactera pour les prochaines étapes.
                  </div>

                  <div className="form-buttons">
                    <button type="submit" className="btn-submit">
                      ✉️ Envoyer ma demande
                    </button>
                  </div>
                </form>
              ) : (
                <div className="success-message">
                  <div className="success-icon">✅</div>
                  <div className="success-text">
                    <h3>Merci pour votre demande !</h3>
                    <p>Nous avons bien reçu votre candidature. Notre équipe vous contactera très bientôt.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: AVAILABLE COACHES */}
        {activeTab === 'available' && (
          <div className="coach-tab-content active">
            <div className="available-coaches-section">
              <div className="coaches-header">
                <h2>Nos Coachs Experts</h2>
                <p>Découvrez notre équipe de coachs certifiés et expérimentés</p>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="loading-container">
                  <div className="loader"></div>
                  <p>Chargement des coachs...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="error-message">
                  <p>⚠️ {error}</p>
                  <button onClick={fetchCoachs} className="btn-retry">
                    🔄 Réessayer
                  </button>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && coaches.length === 0 && (
                <div className="empty-state">
                  <p>😢 Aucun coach disponible pour le moment</p>
                </div>
              )}

              {/* Coaches Grid */}
              {!loading && coaches.length > 0 && (
                <div className="coaches-grid">
                  {coaches.map((coach, index) => (
                    <div key={coach._id || index} className="coach-card">
                      {/* Coach Image/Avatar */}
                      <div className="coach-image">
                        {coach.firstName?.charAt(0).toUpperCase() || '👤'}
                      </div>

                      {/* Coach Info */}
                      <div className="coach-info">
                        <div className="coach-name">{coach.firstName}</div>

                        {/* Bio */}
                        <div className="coach-bio">
                          {coach.bio || 'Coach passionné de fitness'}
                        </div>

                        {/* Contact Info */}
                        <div className="coach-contact">
                          <div className="contact-item">
                            <span className="contact-icon">📧</span>
                            <span className="contact-text">{coach.email}</span>
                          </div>
                          <div className="contact-item">
                            <span className="contact-icon">📱</span>
                            <span className="contact-text">{coach.phone}</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <button 
                          className="btn-contact-coach"
                          onClick={() => handleContactCoach(coach)}
                        >
                          💬 Contacter le coach
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* NOTIFICATION */}
      {notification && (
        <div className="coach-notification">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Coach;
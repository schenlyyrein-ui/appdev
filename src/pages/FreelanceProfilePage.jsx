import React, { useState } from 'react';
import MainSidebarFreelance from '../components/MainSidebarFreelance';
import MainNavbar from '../components/MainNavbar';
import './FreelanceProfilePage.css';

const FreelanceProfilePage = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [services, setServices] = useState([
    { id: 1, name: 'Web Development Consultation', price: '₱7,500' },
    { id: 2, name: 'Full Website Creation', price: '₱12,000' }
  ]);
  const [availability, setAvailability] = useState(Array(42).fill(false));

  const handleAddPortfolio = () => {
    const newItem = {
      id: Date.now(),
      title: `Project ${portfolioItems.length + 1}`,
      description: 'New portfolio item'
    };
    setPortfolioItems([...portfolioItems, newItem]);
  };

  const handleAddService = () => {
    const newService = {
      id: Date.now(),
      name: 'New Service',
      price: '₱0'
    };
    setServices([...services, newService]);
  };

  const handleEditProfile = () => {
    alert('Edit Profile functionality would open a form here!');
  };

  const toggleAvailability = (index) => {
    const newAvailability = [...availability];
    newAvailability[index] = !newAvailability[index];
    setAvailability(newAvailability);
  };

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const calendarDays = Array.from({ length: 42 }, (_, i) => i + 1);

  return (
    <>
      <MainNavbar />
      <div className="freelance-profile-page">
        <MainSidebarFreelance />
        
        <div className="freelance-profile-content">
          {/* Header Section */}
          <div className="freelance-profile-header">
            <div className="freelance-profile-main-info">
              <div className="freelance-profile-avatar-section">
                <div className="freelance-profile-avatar-large">
                  <span className="freelance-avatar-initials">AJ</span>
                </div>
                <div className="freelance-profile-basic-info">
                  <h1>Adrian Julian</h1>
                  <p className="freelance-profile-role">Web Designer</p>
                  <p className="freelance-profile-age">40</p>
                </div>
              </div>
              <p className="freelance-profile-tagline">
                A passionate web-designer specializing in ideas, ergonomics, and user-centered designs.
              </p>
              <button className="freelance-edit-profile-btn" onClick={handleEditProfile}>
                EDIT PROFILE
              </button>
            </div>
          </div>

          <div className="freelance-profile-grid">
            {/* Left Column */}
            <div className="freelance-left-column">
              {/* About Me Section */}
              <div className="freelance-profile-section">
                <h2>About me</h2>
                <div className="freelance-about-content">
                  <p>
                    I create visually appealing and functional websites that focus on great user experience. 
                    With a strong attention to detail and a love for modern design, I help clients bring 
                    their ideas to life through efficient, high-quality work.
                  </p>
                </div>
              </div>

              {/* Skills Section */}
              <div className="freelance-profile-section">
                <h2>Skills</h2>
                <div className="freelance-skills-grid">
                  <span className="freelance-skill-tag">CSS</span>
                  <span className="freelance-skill-tag">Javascript</span>
                  <span className="freelance-skill-tag">HTML</span>
                  <span className="freelance-skill-tag">UI/UX</span>
                </div>
              </div>

              {/* Portfolio Section */}
              <div className="freelance-profile-section">
                <div className="freelance-section-header">
                  <h2>Portfolio</h2>
                  <button className="freelance-add-btn" onClick={handleAddPortfolio}>
                    + Add Item
                  </button>
                </div>
                <div className="freelance-portfolio-grid">
                  {portfolioItems.length === 0 ? (
                    <div className="freelance-empty-portfolio">
                      <p>No portfolio items yet. Click "Add Item" to get started!</p>
                    </div>
                  ) : (
                    portfolioItems.map(item => (
                      <div key={item.id} className="freelance-portfolio-item">
                        <div className="freelance-portfolio-placeholder">
                          <span>+</span>
                        </div>
                        <p>{item.title}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="freelance-right-column">
              {/* Services and Rates */}
              <div className="freelance-profile-section">
                <div className="freelance-section-header">
                  <h2>Services and Rates</h2>
                  <button className="freelance-add-btn" onClick={handleAddService}>
                    + Add Service
                  </button>
                </div>
                <div className="freelance-services-list">
                  {services.map(service => (
                    <div key={service.id} className="freelance-service-item">
                      <div className="freelance-service-info">
                        <h4>{service.name}</h4>
                        <span className="freelance-service-price">{service.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability Calendar */}
              <div className="freelance-profile-section">
                <h2>Availability</h2>
                <div className="freelance-calendar-container">
                  <div className="freelance-calendar-header">
                    {daysOfWeek.map(day => (
                      <div key={day} className="freelance-calendar-day-header">{day}</div>
                    ))}
                  </div>
                  <div className="freelance-calendar-grid">
                    {calendarDays.map((day, index) => (
                      <div
                        key={index}
                        className={`freelance-calendar-day ${availability[index] ? 'freelance-available' : ''} ${
                          day > 31 ? 'freelance-empty' : ''
                        }`}
                        onClick={() => day <= 31 && toggleAvailability(index)}
                      >
                        {day <= 31 ? day : ''}
                      </div>
                    ))}
                  </div>
                  <div className="freelance-calendar-legend">
                    <div className="freelance-legend-item">
                      <div className="freelance-legend-color freelance-available"></div>
                      <span>Available</span>
                    </div>
                    <div className="freelance-legend-item">
                      <div className="freelance-legend-color"></div>
                      <span>Unavailable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreelanceProfilePage;
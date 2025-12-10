// ProfilePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import axios from 'axios';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    email: '',
    location: '',
    contactNumber: '',
    skills: '',
    verificationFile: null
  });

  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        verificationFile: e.target.files[0]
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData(prev => ({
        ...prev,
        verificationFile: e.dataTransfer.files[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    dataToSend.append('full_name', formData.fullName);
    dataToSend.append('email', formData.email);
    dataToSend.append('date_of_birth', formData.dateOfBirth);
    dataToSend.append('location', formData.location);
    dataToSend.append('contact_number', formData.contactNumber);
    dataToSend.append('skills_services', formData.skills);
    dataToSend.append('resume', formData.verificationFile); // Send the file

    try {
      const response = await axios.post('/api/auth/complete-profile', dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // After successful profile completion, redirect to PendingPage
      navigate('/pending-approval');
    } catch (error) {
      console.error("Error during profile submission:", error);
    }
  };

  return (
    <div className="prfle-page">
      <div className="prfle-container">
        <div className="prfle-header">
          <h1>Create your Profile</h1>
          <p>Join our platform and showcase your skills to potential clients</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="prfle-form-section">
            <div className="prfle-form-row">
              <div className="prfle-form-group">
                <label htmlFor="fullName"><strong>Full Name:</strong></label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="prfle-form-group">
                <label htmlFor="dateOfBirth">Date Of Birth:</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="prfle-form-row">
              <div className="prfle-form-group">
                <label htmlFor="email"><strong>Email Address:</strong></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="prfle-form-group">
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </div>
            </div>
            
            <div className="prfle-form-row">
              <div className="prfle-form-group">
                <label htmlFor="contactNumber"><strong>Contact Number:</strong></label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div className="prfle-form-group">
                <label htmlFor="skills">Skills/Services:</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g., Web Development, Graphic Design"
                />
              </div>
            </div>
          </div>
          
          <div className="prfle-section-divider">
            <span>Verification</span>
          </div>
          
          <div className="prfle-verification-section">
            <h2>Identity Verification</h2>
            <p className="prfle-verification-description">
              Upload a clear image of your resume for account verification. 
              This helps us ensure the security and authenticity of our platform.
            </p>
            
            <div 
              className={`prfle-file-upload-area ${isDragging ? 'prfle-dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="prfle-upload-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <div className="prfle-upload-text">
                <p>Drag & drop your resume here or</p>
                <label htmlFor="verificationFile" className="prfle-upload-btn">
                  Browse Files
                </label>
                <input
                  type="file"
                  id="verificationFile"
                  name="verificationFile"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                />
              </div>
              
              <p className="prfle-file-types">Supported formats: PDF, JPG, PNG</p>
              
              {formData.verificationFile && (
                <div className="prfle-file-preview">
                  <div className="prfle-file-info">
                    <span className="prfle-file-icon">📄</span>
                    <div className="prfle-file-details">
                      <p className="prfle-file-name">{formData.verificationFile.name}</p>
                      <p className="prfle-file-size">
                        {(formData.verificationFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button 
                      type="button" 
                      className="prfle-remove-file"
                      onClick={() => setFormData(prev => ({ ...prev, verificationFile: null }))}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button type="submit" className="prfle-submit-btn">
              Create My Account
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </form>
        
        <div className="prfle-disclaimer">
          <div className="prfle-disclaimer-icon">ℹ️</div>
          <p><strong>Disclaimer:</strong> All personal information you provide will be kept strictly confidential and stored securely. Your details will only be used for verification and platform-related purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
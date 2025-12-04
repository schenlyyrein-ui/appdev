import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Tab, Tabs, Alert, Badge, ProgressBar, Modal } from 'react-bootstrap';
import './AdminSettings.css';
import MainNavbar from "../components/MainNavbar";
import AdminSidebar from "../components/AdminSidebar";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'Settings updated', time: '2m ago', type: 'success' },
    { id: 2, action: 'Cache cleared', time: '1h ago', type: 'info' },
    { id: 3, action: 'Backup completed', time: '3h ago', type: 'success' }
  ]);

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'StellarService',
    siteDescription: 'Premium Freelance Services Platform',
    adminEmail: 'admin@stellarservice.com',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY',
    itemsPerPage: 25,
    maintenanceMode: false,
    enableRegistration: true,
    siteLanguage: 'en'
  });

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordMinLength: 8,
    loginAttempts: 5,
    ipWhitelist: ['192.168.1.0/24'],
    auditLogRetention: 365,
    forceHTTPS: true,
    contentSecurityPolicy: true
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    securityAlerts: true,
    userRegistrations: true,
    paymentNotifications: true,
    systemAlerts: true,
    lowStorageAlerts: true,
    weeklyReports: false,
    marketingEmails: false
  });

  // Appearance Settings State
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    primaryColor: '#1d8aa5',
    sidebarStyle: 'expanded',
    dashboardLayout: 'grid',
    fontFamily: 'Segoe UI',
    fontSize: 'medium',
    borderRadius: 'medium',
    animation: true
  });

  // Handle Settings Changes
  const handleGeneralChange = (field, value) => {
    setGeneralSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field, value) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field, value) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleAppearanceChange = (field, value) => {
    setAppearanceSettings(prev => ({ ...prev, [field]: value }));
  };

  // Enhanced Save Settings with validation
  const saveSettings = () => {
    setSaveStatus({ type: 'info', message: 'Saving settings...' });
    
    setTimeout(() => {
      if (generalSettings.siteName.trim() === '') {
        setSaveStatus({ type: 'danger', message: 'Site name cannot be empty!' });
        return;
      }
      
      if (!/\S+@\S+\.\S+/.test(generalSettings.adminEmail)) {
        setSaveStatus({ type: 'danger', message: 'Please enter a valid email address!' });
        return;
      }
      
      setSaveStatus({ type: 'success', message: 'Settings saved successfully! 🎉' });
      
      setRecentActivity(prev => [
        { id: Date.now(), action: 'Settings saved', time: 'Just now', type: 'success' },
        ...prev.slice(0, 2)
      ]);
      
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 4000);
    }, 1500);
  };

  // Enhanced Reset with confirmation modal
  const resetToDefaults = () => {
    if (window.confirm('🚨 Are you sure you want to reset ALL settings to default values? This action cannot be undone.')) {
      setGeneralSettings({
        siteName: 'StellarService',
        siteDescription: 'Premium Freelance Services Platform',
        adminEmail: 'admin@stellarservice.com',
        timezone: 'UTC-5',
        dateFormat: 'MM/DD/YYYY',
        itemsPerPage: 25,
        maintenanceMode: false,
        enableRegistration: true,
        siteLanguage: 'en'
      });
      
      setSaveStatus({ type: 'warning', message: 'All settings have been reset to default values! ⚠️' });
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 4000);
    }
  };

  // Enhanced Test Email with status
  const testEmailConfig = () => {
    setSaveStatus({ type: 'info', message: '📧 Sending test email...' });
    setTimeout(() => {
      setSaveStatus({ type: 'success', message: '✅ Test email sent successfully! Check your inbox.' });
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 4000);
    }, 2000);
  };

  // Enhanced Clear Cache with confirmation
  const clearCache = () => {
    setSaveStatus({ type: 'info', message: '🧹 Clearing system cache...' });
    setTimeout(() => {
      setSaveStatus({ type: 'success', message: '✅ System cache cleared successfully! Performance optimized.' });
      
      setRecentActivity(prev => [
        { id: Date.now(), action: 'Cache cleared', time: 'Just now', type: 'info' },
        ...prev.slice(0, 2)
      ]);
      
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 4000);
    }, 1500);
  };

  // Enhanced Backup System with progress
  const startBackup = () => {
    setShowBackupModal(true);
    setIsBackingUp(true);
    setBackupProgress(0);
    
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          
          setRecentActivity(prev => [
            { id: Date.now(), action: 'Backup completed', time: 'Just now', type: 'success' },
            ...prev.slice(0, 2)
          ]);
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const closeBackupModal = () => {
    setShowBackupModal(false);
    setBackupProgress(0);
  };

  // Quick Actions
  const quickActions = [
    { 
      icon: 'fa-rotate', 
      label: 'Clear Cache', 
      action: clearCache,
      variant: 'outline-info'
    },
    { 
      icon: 'fa-database', 
      label: 'Backup Now', 
      action: startBackup,
      variant: 'outline-success'
    }
  ];

  return (
    <>
      <MainNavbar />
      <div className="admin-settings-page">
        <Container fluid>
          <Row>
            <AdminSidebar />
            
            <Col xs={12} md={9} className="admin-main">
              {/* HEADER WITH QUICK ACTIONS */}
              <Row className="admin-header-row">
                <Col xs={12}>
                  <div className="admin-header">
                    <div>
                      <h2 className="admin-section-title">Settings</h2>
                      <p className="admin-section-subtitle">
                        Configure system settings and preferences
                      </p>
                    </div>
                    <div className="admin-header-actions">
                      <div className="quick-actions">
                        {quickActions.map((action, index) => (
                          <Button
                            key={index}
                            variant={action.variant}
                            size="sm"
                            onClick={action.action}
                            className="quick-action-btn"
                          >
                            <i className={`fa-solid ${action.icon}`} />
                            {action.label}
                          </Button>
                        ))}
                      </div>
                      
                      {/* Compact Recent Activity */}
                      <div className="recent-activity-compact">
                        <div className="activity-toggle">
                          <i className="fa-solid fa-clock-rotate-left"></i>
                          <span className="activity-count">{recentActivity.length}</span>
                        </div>
                        <div className="activity-dropdown">
                          <div className="activity-header">
                            <span>Recent Activity</span>
                            <Badge bg="light" text="dark">{recentActivity.length}</Badge>
                          </div>
                          <div className="activity-list">
                            {recentActivity.map(activity => (
                              <div key={activity.id} className="activity-item-compact">
                                <div className={`activity-dot activity-dot-${activity.type}`}></div>
                                <div className="activity-content-compact">
                                  <span className="activity-text">{activity.action}</span>
                                  <small className="activity-time">{activity.time}</small>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button className="admin-action-btn">
                        <i className="fa-regular fa-bell" />
                        <span className="notification-dot"></span>
                      </button>
                      <div className="admin-user-avatar">
                        <span>AJ</span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* STATUS ALERT */}
              {saveStatus.message && (
                <Row className="mb-4">
                  <Col xs={12}>
                    <Alert variant={saveStatus.type} className="settings-alert">
                      <i className={`fa-solid ${
                        saveStatus.type === 'success' ? 'fa-check' :
                        saveStatus.type === 'info' ? 'fa-info' :
                        saveStatus.type === 'warning' ? 'fa-warning' : 'fa-exclamation'
                      }`} />
                      {saveStatus.message}
                    </Alert>
                  </Col>
                </Row>
              )}

              {/* SETTINGS TABS */}
              <Row className="settings-tabs-row">
                <Col xs={12}>
                  <Card className="settings-tabs-card">
                    <Card.Body className="tabs-card-body">
                      <Tabs
                        activeKey={activeTab}
                        onSelect={(tab) => setActiveTab(tab)}
                        className="settings-tabs"
                      >
                        {/* GENERAL SETTINGS TAB */}
                        <Tab eventKey="general" title={
                          <span className="tab-title-content">
                            <i className="fa-solid fa-gear" />
                            General
                          </span>
                        }>
                          <div className="tab-content">
                            <div className="tab-header">
                              <h4 className="tab-title">General Settings</h4>
                              <p className="tab-description">
                                Configure basic system settings and preferences for your platform
                              </p>
                            </div>
                            
                            <Row className="settings-form">
                              <Col md={6} className="mb-4">
                                <Form.Group className="setting-group">
                                  <Form.Label className="form-label-custom">
                                    <i className="fa-solid fa-signature me-2"></i>
                                    Site Name
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={generalSettings.siteName}
                                    onChange={(e) => handleGeneralChange('siteName', e.target.value)}
                                    placeholder="Enter your site name"
                                    className="form-control-custom"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6} className="mb-4">
                                <Form.Group className="setting-group">
                                  <Form.Label className="form-label-custom">
                                    <i className="fa-solid fa-envelope me-2"></i>
                                    Admin Email
                                  </Form.Label>
                                  <Form.Control
                                    type="email"
                                    value={generalSettings.adminEmail}
                                    onChange={(e) => handleGeneralChange('adminEmail', e.target.value)}
                                    placeholder="admin@example.com"
                                    className="form-control-custom"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={12} className="mb-4">
                                <Form.Group className="setting-group">
                                  <Form.Label className="form-label-custom">
                                    <i className="fa-solid fa-file-lines me-2"></i>
                                    Site Description
                                  </Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={generalSettings.siteDescription}
                                    onChange={(e) => handleGeneralChange('siteDescription', e.target.value)}
                                    placeholder="Describe your platform..."
                                    className="form-control-custom"
                                  />
                                </Form.Group>
                              </Col>
                              
                              <Col md={4} className="mb-4">
                                <Form.Group className="setting-group">
                                  <Form.Label className="form-label-custom">
                                    <i className="fa-solid fa-globe me-2"></i>
                                    Timezone
                                  </Form.Label>
                                  <Form.Select
                                    value={generalSettings.timezone}
                                    onChange={(e) => handleGeneralChange('timezone', e.target.value)}
                                    className="form-control-custom"
                                  >
                                    <option value="UTC-5">UTC-5 (EST)</option>
                                    <option value="UTC-8">UTC-8 (PST)</option>
                                    <option value="UTC+0">UTC+0 (GMT)</option>
                                    <option value="UTC+1">UTC+1 (CET)</option>
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                              <Col md={4} className="mb-4">
                                <Form.Group className="setting-group">
                                  <Form.Label className="form-label-custom">
                                    <i className="fa-solid fa-calendar me-2"></i>
                                    Date Format
                                  </Form.Label>
                                  <Form.Select
                                    value={generalSettings.dateFormat}
                                    onChange={(e) => handleGeneralChange('dateFormat', e.target.value)}
                                    className="form-control-custom"
                                  >
                                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                              <Col md={4} className="mb-4">
                                <Form.Group className="setting-group">
                                  <Form.Label className="form-label-custom">
                                    <i className="fa-solid fa-list me-2"></i>
                                    Items Per Page
                                  </Form.Label>
                                  <Form.Select
                                    value={generalSettings.itemsPerPage}
                                    onChange={(e) => handleGeneralChange('itemsPerPage', parseInt(e.target.value))}
                                    className="form-control-custom"
                                  >
                                    <option value={10}>10 items</option>
                                    <option value={25}>25 items</option>
                                    <option value={50}>50 items</option>
                                    <option value={100}>100 items</option>
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                              
                              <Col md={6} className="mb-4">
                                <div className="setting-group switch-group">
                                  <Form.Check
                                    type="switch"
                                    id="maintenance-mode"
                                    label={
                                      <span className="switch-label">
                                        <i className="fa-solid fa-screwdriver-wrench me-2"></i>
                                        Maintenance Mode
                                        {generalSettings.maintenanceMode && (
                                          <Badge bg="warning" className="ms-2">Active</Badge>
                                        )}
                                      </span>
                                    }
                                    checked={generalSettings.maintenanceMode}
                                    onChange={(e) => handleGeneralChange('maintenanceMode', e.target.checked)}
                                    className="custom-switch"
                                  />
                                  <Form.Text className="text-muted switch-description">
                                    When enabled, the site will be unavailable to visitors
                                  </Form.Text>
                                </div>
                              </Col>
                              <Col md={6} className="mb-4">
                                <div className="setting-group switch-group">
                                  <Form.Check
                                    type="switch"
                                    id="enable-registration"
                                    label={
                                      <span className="switch-label">
                                        <i className="fa-solid fa-user-plus me-2"></i>
                                        User Registration
                                      </span>
                                    }
                                    checked={generalSettings.enableRegistration}
                                    onChange={(e) => handleGeneralChange('enableRegistration', e.target.checked)}
                                    className="custom-switch"
                                  />
                                  <Form.Text className="text-muted switch-description">
                                    Allow new users to register on the platform
                                  </Form.Text>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Tab>

                        {/* SECURITY SETTINGS TAB */}
                        <Tab eventKey="security" title={
                          <span className="tab-title-content">
                            <i className="fa-solid fa-shield-halved" />
                            Security
                          </span>
                        }>
                          <div className="tab-content">
                            <div className="tab-header">
                              <h4 className="tab-title">Security Settings</h4>
                              <p className="tab-description">
                                Protect your platform with advanced security policies and access controls
                              </p>
                            </div>
                            
                            <Row className="settings-form">
                              <Col md={6} className="mb-4">
                                <div className="security-feature">
                                  <Form.Check
                                    type="switch"
                                    id="two-factor-auth"
                                    label={
                                      <span className="switch-label">
                                        <i className="fa-solid fa-mobile-screen me-2"></i>
                                        Two-Factor Authentication
                                        <Badge bg="success" className="ms-2">Recommended</Badge>
                                      </span>
                                    }
                                    checked={securitySettings.twoFactorAuth}
                                    onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                                    className="custom-switch"
                                  />
                                  <Form.Text className="text-muted switch-description">
                                    Require 2FA for all admin accounts
                                  </Form.Text>
                                </div>
                                
                                <Form.Group className="setting-group mt-4">
                                  <Form.Label className="form-label-custom">
                                    <i className="fa-solid fa-clock me-2"></i>
                                    Session Timeout (minutes)
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={securitySettings.sessionTimeout}
                                    onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                                    min={5}
                                    max={120}
                                    className="form-control-custom"
                                  />
                                </Form.Group>
                              </Col>
                              
                              <Col md={6} className="mb-4">
                                <Form.Group className="setting-group">
                                  <Form.Label className="form-label-custom">
                                    <i className="fa-solid fa-lock me-2"></i>
                                    Minimum Password Length
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={securitySettings.passwordMinLength}
                                    onChange={(e) => handleSecurityChange('passwordMinLength', parseInt(e.target.value))}
                                    min={6}
                                    max={20}
                                    className="form-control-custom"
                                  />
                                </Form.Group>
                                
                                <Form.Group className="setting-group mt-4">
                                  <Form.Label className="form-label-custom">
                                    <i className="fa-solid fa-ban me-2"></i>
                                    Max Login Attempts
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={securitySettings.loginAttempts}
                                    onChange={(e) => handleSecurityChange('loginAttempts', parseInt(e.target.value))}
                                    min={3}
                                    max={10}
                                    className="form-control-custom"
                                  />
                                </Form.Group>
                              </Col>
                              
                              <Col md={12} className="mb-4">
                                <Form.Group className="setting-group">
                                  <Form.Label className="form-label-custom">
                                    <i className="fa-solid fa-network-wired me-2"></i>
                                    IP Whitelist
                                  </Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={securitySettings.ipWhitelist.join('\n')}
                                    onChange={(e) => handleSecurityChange('ipWhitelist', e.target.value.split('\n'))}
                                    placeholder="192.168.1.0/24&#10;10.0.0.1"
                                    className="form-control-custom"
                                  />
                                  <Form.Text className="text-muted">
                                    Enter one IP address or range per line. Leave empty to allow all IPs.
                                  </Form.Text>
                                </Form.Group>
                              </Col>
                            </Row>
                          </div>
                        </Tab>

                        {/* Add other tabs here... */}

                      </Tabs>

                      {/* ENHANCED ACTION BUTTONS */}
                      <div className="settings-actions">
                        <Button variant="primary" onClick={saveSettings} className="action-btn-primary">
                          <i className="fa-solid fa-floppy-disk" />
                          Save Changes
                        </Button>
                        <Button variant="outline-secondary" onClick={resetToDefaults}>
                          <i className="fa-solid fa-rotate-left" />
                          Reset Defaults
                        </Button>
                        <Button variant="outline-info" onClick={clearCache}>
                          <i className="fa-solid fa-broom" />
                          Clear Cache
                        </Button>
                        <Button variant="outline-success" onClick={startBackup}>
                          <i className="fa-solid fa-database" />
                          Backup System
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        {/* BACKUP MODAL */}
        <Modal show={showBackupModal} onHide={closeBackupModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fa-solid fa-database me-2"></i>
              System Backup
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <i className="fa-solid fa-cloud-arrow-down fa-3x text-primary mb-3"></i>
              <h5>Creating System Backup</h5>
              <p className="text-muted">Please wait while we backup your system data...</p>
              
              <ProgressBar 
                now={backupProgress} 
                label={`${backupProgress}%`}
                variant="success"
                animated 
                className="mb-3"
              />
              
              {backupProgress === 100 && (
                <Alert variant="success" className="mb-0">
                  <i className="fa-solid fa-check me-2"></i>
                  Backup completed successfully!
                </Alert>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={closeBackupModal}
              disabled={isBackingUp}
            >
              Close
            </Button>
            <Button 
              variant="primary" 
              onClick={startBackup}
              disabled={isBackingUp}
            >
              <i className="fa-solid fa-rotate me-2"></i>
              Backup Again
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AdminSettings;
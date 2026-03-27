import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Save, 
  RefreshCw,
  Moon,
  Sun,
  Monitor,
  Mail,
  MessageSquare,
  User,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Languages,
  Clock,
  DollarSign
} from 'lucide-react';
import AdminLayout from '../admin-dash/components/layout/AdminLayout';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('notifications');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    shoutoutAlerts: true,
    commentAlerts: true,
    mentionAlerts: true,
    weeklyDigest: false,
    marketingEmails: false,
    digestDay: 'monday',
    digestTime: '09:00'
  });
  
  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginAlerts: true,
    deviceManagement: true,
    showEmail: false,
    passwordLastChanged: '2024-01-15'
  });
  
  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    sidebarCollapsed: false,
    compactMode: false,
    fontSize: 'medium',
    animations: true,
    highContrast: false
  });
  
  // Language & Region Settings
  const [languageSettings, setLanguageSettings] = useState({
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    weekStart: 'monday',
    numberFormat: 'en-US',
    currency: 'USD'
  });
  
  // Password Change Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Load saved settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('bragboard_settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      if (settings.notifications) setNotificationSettings(settings.notifications);
      if (settings.security) setSecuritySettings(settings.security);
      if (settings.appearance) setAppearanceSettings(settings.appearance);
      if (settings.language) setLanguageSettings(settings.language);
    }
  }, []);
  
  const handleSaveSettings = async () => {
    setSaving(true);
    setSaveSuccess(false);
    
    // Simulate API call
    setTimeout(() => {
      // Save to localStorage
      const allSettings = {
        notifications: notificationSettings,
        security: securitySettings,
        appearance: appearanceSettings,
        language: languageSettings
      };
      localStorage.setItem('bragboard_settings', JSON.stringify(allSettings));
      
      // Apply theme immediately
      if (appearanceSettings.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      setSaving(false);
      setSaveSuccess(true);
      
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };
  
  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    // API call to change password
    alert('Password changed successfully!');
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };
  
  const sections = [
    { id: 'notifications', name: 'Notifications', icon: Bell, description: 'Configure notification preferences' },
    { id: 'security', name: 'Security', icon: Shield, description: 'Manage security settings' },
    { id: 'appearance', name: 'Appearance', icon: Palette, description: 'Customize theme and display' },
    { id: 'language', name: 'Language & Region', icon: Globe, description: 'Set language and regional preferences' }
  ];
  
  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <div className="flex items-center gap-3">
              <Mail className="text-gray-500" size={20} />
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={notificationSettings.emailNotifications}
                onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </div>
          </label>
          
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <div className="flex items-center gap-3">
              <MessageSquare className="text-gray-500" size={20} />
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">Receive real-time notifications in browser</p>
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={notificationSettings.pushNotifications}
                onChange={(e) => setNotificationSettings({...notificationSettings, pushNotifications: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </div>
          </label>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <div>
              <p className="font-medium text-gray-900">Shout-out Alerts</p>
              <p className="text-sm text-gray-500">Get notified when someone mentions you in a shout-out</p>
            </div>
            <input
              type="checkbox"
              checked={notificationSettings.shoutoutAlerts}
              onChange={(e) => setNotificationSettings({...notificationSettings, shoutoutAlerts: e.target.checked})}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
          
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <div>
              <p className="font-medium text-gray-900">Comment Alerts</p>
              <p className="text-sm text-gray-500">Get notified when someone comments on your shout-outs</p>
            </div>
            <input
              type="checkbox"
              checked={notificationSettings.commentAlerts}
              onChange={(e) => setNotificationSettings({...notificationSettings, commentAlerts: e.target.checked})}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
          
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <div>
              <p className="font-medium text-gray-900">Mention Alerts</p>
              <p className="text-sm text-gray-500">Get notified when someone @mentions you</p>
            </div>
            <input
              type="checkbox"
              checked={notificationSettings.mentionAlerts}
              onChange={(e) => setNotificationSettings({...notificationSettings, mentionAlerts: e.target.checked})}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Digest Settings</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <div>
              <p className="font-medium text-gray-900">Weekly Digest</p>
              <p className="text-sm text-gray-500">Receive a weekly summary of activity</p>
            </div>
            <input
              type="checkbox"
              checked={notificationSettings.weeklyDigest}
              onChange={(e) => setNotificationSettings({...notificationSettings, weeklyDigest: e.target.checked})}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
          
          {notificationSettings.weeklyDigest && (
            <div className="grid grid-cols-2 gap-4 pl-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                <select
                  value={notificationSettings.digestDay}
                  onChange={(e) => setNotificationSettings({...notificationSettings, digestDay: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={notificationSettings.digestTime}
                  onChange={(e) => setNotificationSettings({...notificationSettings, digestTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
          
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <div>
              <p className="font-medium text-gray-900">Marketing Emails</p>
              <p className="text-sm text-gray-500">Receive product updates and announcements</p>
            </div>
            <input
              type="checkbox"
              checked={notificationSettings.marketingEmails}
              onChange={(e) => setNotificationSettings({...notificationSettings, marketingEmails: e.target.checked})}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
  
  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="text-blue-600 mt-0.5" size={20} />
          <div>
            <p className="text-sm text-blue-900 font-medium">Security Status: Good</p>
            <p className="text-sm text-blue-700">Last password change: {securitySettings.passwordLastChanged}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h3>
        <div className="space-y-3">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-left"
          >
            <div className="flex items-center gap-3">
              <Lock className="text-gray-500" size={20} />
              <div>
                <p className="font-medium text-gray-900">Change Password</p>
                <p className="text-sm text-gray-500">Update your password regularly for security</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>
          
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={securitySettings.twoFactorAuth}
                onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </div>
          </label>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Management</h3>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
            <select
              value={securitySettings.sessionTimeout}
              onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="240">4 hours</option>
            </select>
          </div>
          
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <div>
              <p className="font-medium text-gray-900">Login Alerts</p>
              <p className="text-sm text-gray-500">Get notified when a new device logs into your account</p>
            </div>
            <input
              type="checkbox"
              checked={securitySettings.loginAlerts}
              onChange={(e) => setSecuritySettings({...securitySettings, loginAlerts: e.target.checked})}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
          
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <div>
              <p className="font-medium text-gray-900">Device Management</p>
              <p className="text-sm text-gray-500">Manage and view all devices connected to your account</p>
            </div>
            <input
              type="checkbox"
              checked={securitySettings.deviceManagement}
              onChange={(e) => setSecuritySettings({...securitySettings, deviceManagement: e.target.checked})}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
  
  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme</h3>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setAppearanceSettings({...appearanceSettings, theme: 'light'})}
            className={`p-4 border-2 rounded-lg text-center transition ${
              appearanceSettings.theme === 'light' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Sun className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="font-medium">Light</p>
          </button>
          <button
            onClick={() => setAppearanceSettings({...appearanceSettings, theme: 'dark'})}
            className={`p-4 border-2 rounded-lg text-center transition ${
              appearanceSettings.theme === 'dark' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Moon className="w-8 h-8 mx-auto mb-2 text-gray-700" />
            <p className="font-medium">Dark</p>
          </button>
          <button
            onClick={() => setAppearanceSettings({...appearanceSettings, theme: 'system'})}
            className={`p-4 border-2 rounded-lg text-center transition ${
              appearanceSettings.theme === 'system' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Monitor className="w-8 h-8 mx-auto mb-2 text-gray-500" />
            <p className="font-medium">System</p>
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Display</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <div>
              <p className="font-medium text-gray-900">Compact Mode</p>
              <p className="text-sm text-gray-500">Reduce spacing for a more compact layout</p>
            </div>
            <input
              type="checkbox"
              checked={appearanceSettings.compactMode}
              onChange={(e) => setAppearanceSettings({...appearanceSettings, compactMode: e.target.checked})}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
            <div className="flex gap-2">
              {['small', 'medium', 'large'].map(size => (
                <button
                  key={size}
                  onClick={() => setAppearanceSettings({...appearanceSettings, fontSize: size})}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm capitalize ${
                    appearanceSettings.fontSize === size
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <div>
              <p className="font-medium text-gray-900">Animations</p>
              <p className="text-sm text-gray-500">Enable smooth transitions and animations</p>
            </div>
            <input
              type="checkbox"
              checked={appearanceSettings.animations}
              onChange={(e) => setAppearanceSettings({...appearanceSettings, animations: e.target.checked})}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
          
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <div>
              <p className="font-medium text-gray-900">High Contrast</p>
              <p className="text-sm text-gray-500">Increase color contrast for better visibility</p>
            </div>
            <input
              type="checkbox"
              checked={appearanceSettings.highContrast}
              onChange={(e) => setAppearanceSettings({...appearanceSettings, highContrast: e.target.checked})}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
  
  const renderLanguageSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Language</h3>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Interface Language</label>
            <div className="flex items-center gap-2">
              <Languages className="text-gray-500" size={20} />
              <select
                value={languageSettings.language}
                onChange={(e) => setLanguageSettings({...languageSettings, language: e.target.value})}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ja">日本語</option>
                <option value="zh">中文</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Region</h3>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <div className="flex items-center gap-2">
              <Clock className="text-gray-500" size={20} />
              <select
                value={languageSettings.timezone}
                onChange={(e) => setLanguageSettings({...languageSettings, timezone: e.target.value})}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Asia/Kolkata">India (IST)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
                <option value="Australia/Sydney">Sydney (AEDT)</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
              <select
                value={languageSettings.dateFormat}
                onChange={(e) => setLanguageSettings({...languageSettings, dateFormat: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
              <select
                value={languageSettings.timeFormat}
                onChange={(e) => setLanguageSettings({...languageSettings, timeFormat: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="12h">12-hour (12:00 PM)</option>
                <option value="24h">24-hour (14:00)</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">Week Starts On</label>
              <select
                value={languageSettings.weekStart}
                onChange={(e) => setLanguageSettings({...languageSettings, weekStart: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="saturday">Saturday</option>
              </select>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <div className="flex items-center gap-2">
                <DollarSign className="text-gray-500" size={20} />
                <select
                  value={languageSettings.currency}
                  onChange={(e) => setLanguageSettings({...languageSettings, currency: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Password Change Modal
  const PasswordModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Change Password</h3>
          <p className="text-sm text-gray-500 mt-1">Update your password to keep your account secure</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {passwordData.newPassword && passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle size={16} />
              <span>Passwords do not match</span>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={() => setShowPasswordModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleChangePassword}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
  
  return (
    <AdminLayout>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage application settings and preferences</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-80 flex-shrink-0">
          <nav className="space-y-1 sticky top-4">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <div className="flex-1 text-left">
                    <p className="font-medium">{section.name}</p>
                    <p className="text-sm text-gray-500">{section.description}</p>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
        
        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {sections.find(s => s.id === activeSection)?.name}
            </h2>
            <p className="text-gray-600 mt-1">
              {sections.find(s => s.id === activeSection)?.description}
            </p>
          </div>
          
          <div className="p-6">
            {activeSection === 'notifications' && renderNotificationsSection()}
            {activeSection === 'security' && renderSecuritySection()}
            {activeSection === 'appearance' && renderAppearanceSection()}
            {activeSection === 'language' && renderLanguageSection()}
          </div>
          
          {/* Save Button */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <div className="flex items-center justify-between">
              <div>
                {saveSuccess && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={18} />
                    <span className="text-sm">Settings saved successfully!</span>
                  </div>
                )}
              </div>
              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Password Modal */}
      {showPasswordModal && <PasswordModal />}
        </div>
    </AdminLayout>
  );
};

export default Settings;
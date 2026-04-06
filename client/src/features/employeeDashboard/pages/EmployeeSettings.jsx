import React, { useState, useEffect } from "react";
import { Bell, Lock, Palette, Globe, Mail, Smartphone, Shield, Clock } from "lucide-react";
import settingsService from "../../../services/settingsService";
import { ChangePasswordModal } from "../../../components/ChangePasswordModal";
import { useTheme } from "../../../context/ThemeContext";

const EmployeeSettings = () => {
  const { changeTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("notifications");
  const [loading, setLoading] = useState(false);
  const [savingField, setSavingField] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  
  const [settings, setSettings] = useState({
    email_notifications: true,
    push_notifications: true,
    shoutout_alerts: true,
    comment_alerts: true,
    mention_alerts: true,
    twoFactorEnabled: false,
    theme: "dark",
    compact_mode: false,
    font_size: "medium",
    language: "English",
    timezone: "UTC",
    date_format: "MM/DD/YYYY",
    time_format: "12-hour",
    week_start: "Monday",
    currency: "USD - US Dollar",
  });

  // Load settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const data = await settingsService.getUserSettings();
        console.log("✅ Loaded settings:", data);
        setSettings(data);
        setError("");
      } catch (err) {
        console.error("❌ Error loading settings:", err);
        setError("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleToggle = async (key) => {
    // Optimistic update
    const newValue = !settings[key];
    setSettings(prev => ({
      ...prev,
      [key]: newValue
    }));
    setSavingField(key);
    
    try {
      await settingsService.updateUserSetting(key, newValue);
      setSuccess("✓ Setting saved");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      // Revert on error
      setSettings(prev => ({
        ...prev,
        [key]: !newValue
      }));
      const errorMsg = err.response?.data?.detail || err.message || "Failed to save setting";
      setError(errorMsg);
      setTimeout(() => setError(""), 3000);
    } finally {
      setSavingField(null);
    }
  };

  const handleSelectChange = async (key, value) => {
    // Optimistic update
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setSavingField(key);
    
    // If changing theme, also call changeTheme from context
    if (key === "theme") {
      await changeTheme(value);
    }
    
    try {
      await settingsService.updateUserSetting(key, value);
      setSuccess("✓ Setting saved");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      // Revert on error
      setSettings(prev => ({
        ...prev,
        [key]: prev[key]  // Keep old value
      }));
      const errorMsg = err.response?.data?.detail || err.message || "Failed to save setting";
      setError(errorMsg);
      setTimeout(() => setError(""), 3000);
    } finally {
      setSavingField(null);
    }
  };

  const tabs = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "language", label: "Language & Region", icon: Globe },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 min-h-screen">
      {/* Header */}
      <div className="pb-6 border-b-2 border-slate-100 dark:border-slate-800">
        <h1 className="text-3xl font-black text-slate-950 dark:text-white">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 font-medium">Manage your preferences and account settings</p>
      </div>

      {/* Global Messages (Toast Notification) */}
      <div className="fixed top-20 right-6 z-[100] w-full max-w-sm pointer-events-none px-4 flex flex-col items-end gap-3">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/90 border-l-4 border-red-500 p-4 rounded-xl shadow-2xl animate-in fade-in slide-in-from-right-10 duration-300 pointer-events-auto backdrop-blur-md w-full border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-800 rounded-lg flex items-center justify-center text-lg">⚠️</span>
              <p className="text-sm text-red-700 dark:text-red-100 font-bold leading-tight">
                {error}
              </p>
            </div>
          </div>
        )}
        {success && (
          <div className="bg-emerald-50 dark:bg-emerald-900/90 border-l-4 border-emerald-500 p-4 rounded-xl shadow-2xl animate-in fade-in slide-in-from-right-10 duration-300 pointer-events-auto backdrop-blur-md w-full border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-lg flex items-center justify-center text-lg">✓</span>
              <p className="text-sm text-emerald-700 dark:text-emerald-100 font-bold leading-tight">
                {success}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Layout: Sidebar + Content */}
      <div className="flex gap-8">
        
        {/* Sidebar Navigation */}
        <div className="w-80 flex-shrink-0">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl transition-all border-2 flex items-center gap-3 ${
                    isActive
                      ? "border-indigo-200 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 font-bold"
                      : "border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
                  }`}
                >
                  <Icon size={18} />
                  <div className="flex-1">
                    <p className="text-sm">{tab.label}</p>
                    <p className={`text-xs ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-500"}`}>
                      {tab.id === "notifications" && "Configure notification preferences"}
                      {tab.id === "security" && "Manage your security"}
                      {tab.id === "appearance" && "Customize theme and display"}
                      {tab.id === "language" && "Set language and regional preferences"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          
          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6">Notifications</h2>
              
              {/* Email Notifications */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 relative">
                {savingField === "email_notifications" && <div className="absolute inset-0 bg-white/30 dark:bg-slate-950/30 rounded-xl flex items-center justify-center"><div className="w-6 h-6 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <h3 className="font-bold text-slate-950 dark:text-white">Email Notifications</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Receive notifications via email</p>
                    </div>
                  </div>
                  <label className="relative w-14 h-8">
                    <input
                      type="checkbox"
                      checked={settings.email_notifications}
                      onChange={() => handleToggle("email_notifications")}
                      className="sr-only peer"
                      disabled={savingField === "email_notifications"}
                    />
                    <div className={`w-full h-full rounded-full transition-all ${settings.email_notifications ? "bg-blue-500" : "bg-slate-300 dark:bg-slate-600"}`}></div>
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all ${settings.email_notifications ? "translate-x-6" : ""}`}></div>
                  </label>
                </div>
              </div>

              {/* Push Notifications */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 relative">
                {savingField === "push_notifications" && <div className="absolute inset-0 bg-white/30 dark:bg-slate-950/30 rounded-xl flex items-center justify-center"><div className="w-6 h-6 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Smartphone size={20} className="text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <h3 className="font-bold text-slate-950 dark:text-white">Push Notifications</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Receive real-time notifications in browser</p>
                    </div>
                  </div>
                  <label className="relative w-14 h-8">
                    <input
                      type="checkbox"
                      checked={settings.push_notifications}
                      onChange={() => handleToggle("push_notifications")}
                      className="sr-only peer"
                      disabled={savingField === "push_notifications"}
                    />
                    <div className={`w-full h-full rounded-full transition-all ${settings.push_notifications ? "bg-blue-500" : "bg-slate-300 dark:bg-slate-600"}`}></div>
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all ${settings.push_notifications ? "translate-x-6" : ""}`}></div>
                  </label>
                </div>
              </div>

              {/* Alert Preferences */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-950 dark:text-white text-base">Alert Preferences</h3>
                
                <div className="flex items-center justify-between p-4 border-2 border-slate-200 dark:border-slate-700 rounded-lg relative">
                  {savingField === "shoutout_alerts" && <div className="absolute inset-0 bg-white/30 dark:bg-slate-950/30 rounded-lg flex items-center justify-center"><div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>}
                  <div>
                    <p className="font-semibold text-slate-950 dark:text-white">Shout-out Alerts</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Get notified when someone mentions you in a shout-out</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.shoutout_alerts}
                    onChange={() => handleToggle("shoutout_alerts")}
                    className="w-5 h-5 accent-blue-500 dark:bg-slate-800 dark:border-slate-700"
                    disabled={savingField === "shoutout_alerts"}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border-2 border-slate-200 dark:border-slate-700 rounded-lg relative">
                  {savingField === "comment_alerts" && <div className="absolute inset-0 bg-white/30 dark:bg-slate-950/30 rounded-lg flex items-center justify-center"><div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>}
                  <div>
                    <p className="font-semibold text-slate-950 dark:text-white">Comment Alerts</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Get notified when someone comments on your shout-outs</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.comment_alerts}
                    onChange={() => handleToggle("comment_alerts")}
                    className="w-5 h-5 accent-blue-500 dark:bg-slate-800 dark:border-slate-700"
                    disabled={savingField === "comment_alerts"}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border-2 border-slate-200 dark:border-slate-700 rounded-lg relative">
                  {savingField === "mention_alerts" && <div className="absolute inset-0 bg-white/30 dark:bg-slate-950/30 rounded-lg flex items-center justify-center"><div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>}
                  <div>
                    <p className="font-semibold text-slate-950 dark:text-white">Mention Alerts</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Get notified when someone @mentions you</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.mention_alerts}
                    onChange={() => handleToggle("mention_alerts")}
                    className="w-5 h-5 accent-blue-500 dark:bg-slate-800 dark:border-slate-700"
                    disabled={savingField === "mention_alerts"}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6">Security</h2>

              {/* Security Status */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-6 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <Shield className="text-emerald-600 dark:text-emerald-400" size={24} />
                  <div>
                    <p className="font-bold text-emerald-900 dark:text-emerald-300">Security Status: Good</p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-500">Last password change: 2024-01-15</p>
                  </div>
                </div>
              </div>

              {/* Authentication Section */}
              <div>
                <h3 className="font-bold text-slate-950 dark:text-white mb-4">Authentication</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border-2 border-slate-200 dark:border-slate-800 rounded-lg transition-colors duration-300">
                    <div>
                      <p className="font-semibold text-slate-950 dark:text-white">Change Password</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Update your password regularly for security</p>
                    </div>
                    <button 
                      onClick={() => setPasswordModalOpen(true)}
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">→</button>
                  </div>

                  <div className="flex items-center justify-between p-4 border-2 border-slate-200 dark:border-slate-800 rounded-lg relative transition-colors duration-300">
                    {savingField === "two_factor_enabled" && <div className="absolute inset-0 bg-white/30 dark:bg-slate-950/30 rounded-lg flex items-center justify-center"><div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>}
                    <div>
                      <p className="font-semibold text-slate-950 dark:text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative w-14 h-8 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.two_factor_enabled}
                        onChange={() => handleToggle("two_factor_enabled")}
                        className="sr-only peer"
                        disabled={savingField === "two_factor_enabled"}
                      />
                      <div className={`w-full h-full rounded-full transition-all ${settings.two_factor_enabled ? "bg-blue-500" : "bg-slate-300 dark:bg-slate-700"}`}></div>
                      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all ${settings.two_factor_enabled ? "translate-x-6" : ""}`}></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Session Management */}
              <div>
                <h3 className="font-bold text-slate-950 dark:text-white mb-4">Session Management</h3>
                
                <div className="space-y-3">
                  <label className="block">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Session Timeout (minutes)</span>
                    <select 
                      value={settings.session_timeout || "30"} 
                      onChange={(e) => handleSelectChange("session_timeout", parseInt(e.target.value))} 
                      className="w-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                      disabled={savingField === "session_timeout"}
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>60 minutes</option>
                    </select>
                  </label>

                  <div className="flex items-center justify-between p-4 border-2 border-slate-200 dark:border-slate-800 rounded-lg relative transition-colors duration-300">
                    {savingField === "login_alerts_enabled" && <div className="absolute inset-0 bg-white/30 dark:bg-slate-950/30 rounded-lg flex items-center justify-center"><div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>}
                    <div>
                      <p className="font-semibold text-slate-950 dark:text-white">Login Alerts</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Get alerts when your account is accessed</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.login_alerts_enabled}
                      onChange={() => handleToggle("login_alerts_enabled")}
                      className="w-5 h-5 accent-blue-500 dark:bg-slate-800 dark:border-slate-700"
                      disabled={savingField === "login_alerts_enabled"}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6">Appearance</h2>

              {/* Theme Selection */}
              <div>
                <h3 className="font-bold text-slate-950 dark:text-white mb-4">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  {["light", "dark", "system"].map((themeVal) => (
                    <button
                      key={themeVal}
                      onClick={() => handleSelectChange("theme", themeVal)}
                      className={`p-6 rounded-xl border-2 flex flex-col items-center gap-2 transition-all text-center relative ${
                        settings.theme === themeVal
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 font-bold shadow-sm"
                          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      {savingField === "theme" && <div className="absolute inset-0 bg-white/30 dark:bg-slate-950/30 rounded-xl flex items-center justify-center"><div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>}
                      <div className="text-2xl">
                        {themeVal === "light" && "☀️"}
                        {themeVal === "dark" && "🌙"}
                        {themeVal === "system" && "💻"}
                      </div>
                      <p className="font-bold text-slate-950 dark:text-white capitalize">{themeVal}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Options */}
              <div>
                <h3 className="font-bold text-slate-950 dark:text-white mb-4">Display</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border-2 border-slate-200 dark:border-slate-800 rounded-lg relative transition-colors duration-300">
                    {savingField === "compact_mode" && <div className="absolute inset-0 bg-white/30 dark:bg-slate-950/30 rounded-lg flex items-center justify-center"><div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>}
                    <div>
                      <p className="font-semibold text-slate-950 dark:text-white">Compact Mode</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Reduce spacing for a more compact layout</p>
                    </div>
                    <label className="relative w-14 h-8 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.compact_mode}
                        onChange={() => handleToggle("compact_mode")}
                        className="sr-only peer"
                        disabled={savingField === "compact_mode"}
                      />
                      <div className={`w-full h-full rounded-full transition-all ${settings.compact_mode ? "bg-blue-500" : "bg-slate-300 dark:bg-slate-700"}`}></div>
                      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all ${settings.compact_mode ? "translate-x-6" : ""}`}></div>
                    </label>
                  </div>

                  <div className="p-4 border-2 border-slate-200 dark:border-slate-800 rounded-lg transition-colors duration-300">
                    <label className="block">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Font Size</span>
                      <div className="flex gap-2">
                        {["small", "medium", "large"].map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSelectChange("font_size", size)}
                            className={`flex-1 px-3 py-2 rounded text-sm font-bold transition-all ${
                              settings.font_size === size
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                            }`}
                          >
                            {size.charAt(0).toUpperCase() + size.slice(1)}
                          </button>
                        ))}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Language & Region Tab */}
          {activeTab === "language" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white mb-6">Language & Region</h2>

              <div className="space-y-6">
                {/* Language */}
                <div>
                  <label className="block">
                    <span className="font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                      <Globe size={18} />
                      Interface Language
                    </span>
                    <select
                      value={settings.language}
                      onChange={(e) => handleSelectChange("language", e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                      disabled={savingField === "language"}
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Hindi</option>
                      <option>Chinese</option>
                    </select>
                  </label>
                </div>

                {/* Region Settings */}
                <div className="pt-4 border-t-2 border-slate-100 dark:border-slate-800 space-y-6">
                  <h3 className="font-bold text-slate-950 dark:text-white">Region</h3>

                  {/* Timezone */}
                  <div>
                    <label className="block">
                      <span className="font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                        <Clock size={18} />
                        Timezone
                      </span>
                      <select
                        value={settings.timezone}
                        onChange={(e) => handleSelectChange("timezone", e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        disabled={savingField === "timezone"}
                      >
                        <option>UTC</option>
                        <option>India (IST)</option>
                        <option>US Eastern (ET)</option>
                        <option>US Pacific (PT)</option>
                        <option>Europe (GMT)</option>
                        <option>Asia/Tokyo (JST)</option>
                      </select>
                    </label>
                  </div>

                  {/* Date Format */}
                  <div>
                    <label className="block">
                      <span className="font-bold text-slate-700 dark:text-slate-300 mb-2 block">Date Format</span>
                      <select
                        value={settings.date_format}
                        onChange={(e) => handleSelectChange("date_format", e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        disabled={savingField === "date_format"}
                      >
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </label>
                  </div>

                  {/* Time Format */}
                  <div>
                    <label className="block">
                      <span className="font-bold text-slate-700 dark:text-slate-300 mb-2 block">Time Format</span>
                      <select
                        value={settings.time_format}
                        onChange={(e) => handleSelectChange("time_format", e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        disabled={savingField === "time_format"}
                      >
                        <option value="12-hour">12-hour (12:00 PM)</option>
                        <option value="24-hour">24-hour (00:00)</option>
                      </select>
                    </label>
                  </div>

                  {/* Week Start */}
                  <div>
                    <label className="block">
                      <span className="font-bold text-slate-700 dark:text-slate-300 mb-2 block">Week Starts On</span>
                      <select
                        value={settings.week_start}
                        onChange={(e) => handleSelectChange("week_start", e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        disabled={savingField === "week_start"}
                      >
                        <option>Monday</option>
                        <option>Sunday</option>
                        <option>Saturday</option>
                      </select>
                    </label>
                  </div>

                  {/* Currency */}
                  <div>
                    <label className="block">
                      <span className="font-bold text-slate-700 dark:text-slate-300 mb-2 block">Currency</span>
                      <select
                        value={settings.currency}
                        onChange={(e) => handleSelectChange("currency", e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        disabled={savingField === "currency"}
                      >
                        <option>USD - US Dollar</option>
                        <option>EUR - Euro</option>
                        <option>GBP - British Pound</option>
                        <option>INR - Indian Rupee</option>
                        <option>JPY - Japanese Yen</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Password Modal */}
      <ChangePasswordModal 
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSuccess={() => {
          setSuccess("✓ Password changed successfully");
          setTimeout(() => setSuccess(""), 3000);
        }}
      />
    </div>
  );
};

export default EmployeeSettings;

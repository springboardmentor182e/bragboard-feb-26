import React, { useState } from "react";
import { Bell, Lock, Palette, Globe, Mail, Smartphone, Shield, Clock } from "lucide-react";

const EmployeeSettings = () => {
  const [activeTab, setActiveTab] = useState("notifications");
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    shoutoutAlerts: true,
    commentAlerts: true,
    mentionAlerts: true,
    passwordLastChanged: "2024-01-15",
    twoFactorEnabled: false,
    theme: "dark",
    compactMode: false,
    fontSize: "medium",
    language: "English",
    timezone: "India (IST)",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12-hour (12:00 PM)",
    weekStart: "Monday",
    currency: "USD - US Dollar",
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelectChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const tabs = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "language", label: "Language & Region", icon: Globe },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b-2 border-slate-100">
        <h1 className="text-3xl font-black text-slate-950">Settings</h1>
        <p className="text-slate-600 text-sm mt-1 font-medium">Manage your preferences and account settings</p>
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
                      ? "border-indigo-200 bg-indigo-50 text-indigo-700 font-bold"
                      : "border-transparent text-slate-600 hover:bg-slate-50 font-medium"
                  }`}
                >
                  <Icon size={18} />
                  <div className="flex-1">
                    <p className="text-sm">{tab.label}</p>
                    <p className={`text-xs ${isActive ? "text-indigo-600" : "text-slate-600"}`}>
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
              <h2 className="text-xl font-bold text-slate-950 mb-6">Notifications</h2>
              
              {/* Email Notifications */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-indigo-600" />
                    <div>
                      <h3 className="font-bold text-slate-950">Email Notifications</h3>
                      <p className="text-sm text-slate-600">Receive notifications via email</p>
                    </div>
                  </div>
                  <label className="relative w-14 h-8">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={() => handleToggle("emailNotifications")}
                      className="sr-only peer"
                    />
                    <div className={`w-full h-full rounded-full transition-all ${settings.emailNotifications ? "bg-blue-500" : "bg-slate-300"}`}></div>
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all ${settings.emailNotifications ? "translate-x-6" : ""}`}></div>
                  </label>
                </div>
              </div>

              {/* Push Notifications */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Smartphone size={20} className="text-indigo-600" />
                    <div>
                      <h3 className="font-bold text-slate-950">Push Notifications</h3>
                      <p className="text-sm text-slate-600">Receive real-time notifications in browser</p>
                    </div>
                  </div>
                  <label className="relative w-14 h-8">
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={() => handleToggle("pushNotifications")}
                      className="sr-only peer"
                    />
                    <div className={`w-full h-full rounded-full transition-all ${settings.pushNotifications ? "bg-blue-500" : "bg-slate-300"}`}></div>
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all ${settings.pushNotifications ? "translate-x-6" : ""}`}></div>
                  </label>
                </div>
              </div>

              {/* Alert Preferences */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-950 text-base">Alert Preferences</h3>
                
                <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-950">Shout-out Alerts</p>
                    <p className="text-sm text-slate-600">Get notified when someone mentions you in a shout-out</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.shoutoutAlerts}
                    onChange={() => handleToggle("shoutoutAlerts")}
                    className="w-5 h-5 accent-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-950">Comment Alerts</p>
                    <p className="text-sm text-slate-600">Get notified when someone comments on your shout-outs</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.commentAlerts}
                    onChange={() => handleToggle("commentAlerts")}
                    className="w-5 h-5 accent-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-950">Mention Alerts</p>
                    <p className="text-sm text-slate-600">Get notified when someone @mentions you</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.mentionAlerts}
                    onChange={() => handleToggle("mentionAlerts")}
                    className="w-5 h-5 accent-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-slate-950 mb-6">Security</h2>

              {/* Security Status */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
                <div className="flex items-center gap-3">
                  <Shield className="text-emerald-600" size={24} />
                  <div>
                    <p className="font-bold text-emerald-900">Security Status: Good</p>
                    <p className="text-sm text-emerald-700">Last password change: 2024-01-15</p>
                  </div>
                </div>
              </div>

              {/* Authentication Section */}
              <div>
                <h3 className="font-bold text-slate-950 mb-4">Authentication</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-slate-950">Change Password</p>
                      <p className="text-sm text-slate-600">Update your password regularly for security</p>
                    </div>
                    <button className="text-indigo-600 font-bold hover:text-indigo-700">→</button>
                  </div>

                  <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-slate-950">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative w-14 h-8">
                      <input
                        type="checkbox"
                        checked={settings.twoFactorEnabled}
                        onChange={() => handleToggle("twoFactorEnabled")}
                        className="sr-only peer"
                      />
                      <div className={`w-full h-full rounded-full transition-all ${settings.twoFactorEnabled ? "bg-blue-500" : "bg-slate-300"}`}></div>
                      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all ${settings.twoFactorEnabled ? "translate-x-6" : ""}`}></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Session Management */}
              <div>
                <h3 className="font-bold text-slate-950 mb-4">Session Management</h3>
                
                <div className="space-y-3">
                  <label className="block">
                    <span className="font-semibold text-slate-700 mb-2 block">Session Timeout (minutes)</span>
                    <select
                      value={settings.sessionTimeout || "30"}
                      onChange={(e) => handleSelectChange("sessionTimeout", e.target.value)}
                      className="w-full border-2 border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>60 minutes</option>
                    </select>
                  </label>

                  <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-slate-950">Login Alerts</p>
                      <p className="text-sm text-slate-600">Get alerts when your account is accessed</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-slate-950 mb-6">Appearance</h2>

              {/* Theme Selection */}
              <div>
                <h3 className="font-bold text-slate-950 mb-4">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  {["Light", "Dark", "System"].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => handleSelectChange("theme", theme.toLowerCase())}
                      className={`p-6 rounded-xl border-2 flex flex-col items-center gap-2 transition-all text-center ${
                        settings.theme === theme.toLowerCase()
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-2xl">
                        {theme === "Light" && "☀️"}
                        {theme === "Dark" && "🌙"}
                        {theme === "System" && "💻"}
                      </div>
                      <p className="font-bold text-slate-950">{theme}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Options */}
              <div>
                <h3 className="font-bold text-slate-950 mb-4">Display</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-slate-950">Compact Mode</p>
                      <p className="text-sm text-slate-600">Reduce spacing for a more compact layout</p>
                    </div>
                    <label className="relative w-14 h-8">
                      <input
                        type="checkbox"
                        checked={settings.compactMode}
                        onChange={() => handleToggle("compactMode")}
                        className="sr-only peer"
                      />
                      <div className={`w-full h-full rounded-full transition-all ${settings.compactMode ? "bg-blue-500" : "bg-slate-300"}`}></div>
                      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all ${settings.compactMode ? "translate-x-6" : ""}`}></div>
                    </label>
                  </div>

                  <div className="p-4 border-2 border-slate-200 rounded-lg">
                    <label className="block">
                      <span className="font-semibold text-slate-700 mb-2 block">Font Size</span>
                      <div className="flex gap-2">
                        {["Small", "Medium", "Large"].map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSelectChange("fontSize", size.toLowerCase())}
                            className={`flex-1 px-3 py-2 rounded text-sm font-bold transition-all ${
                              settings.fontSize === size.toLowerCase()
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-slate-950">Animations</p>
                      <p className="text-sm text-slate-600">Enable smooth transitions and animations</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-500" />
                  </div>

                  <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-slate-950">High Contrast</p>
                      <p className="text-sm text-slate-600">Increase visual contrast for better readability</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Language & Region Tab */}
          {activeTab === "language" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-slate-950 mb-6">Language & Region</h2>

              <div className="space-y-6">
                {/* Language */}
                <div>
                  <label className="block">
                    <span className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <Globe size={18} />
                      Interface Language
                    </span>
                    <select
                      value={settings.language}
                      onChange={(e) => handleSelectChange("language", e.target.value)}
                      className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                <div className="pt-4 border-t-2 border-slate-100 space-y-6">
                  <h3 className="font-bold text-slate-950">Region</h3>

                  {/* Timezone */}
                  <div>
                    <label className="block">
                      <span className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Clock size={18} />
                        Timezone
                      </span>
                      <select
                        value={settings.timezone}
                        onChange={(e) => handleSelectChange("timezone", e.target.value)}
                        className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option>India (IST)</option>
                        <option>UTC</option>
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
                      <span className="font-bold text-slate-700 mb-2 block">Date Format</span>
                      <select
                        value={settings.dateFormat}
                        onChange={(e) => handleSelectChange("dateFormat", e.target.value)}
                        className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                      <span className="font-bold text-slate-700 mb-2 block">Time Format</span>
                      <select
                        value={settings.timeFormat}
                        onChange={(e) => handleSelectChange("timeFormat", e.target.value)}
                        className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option>12-hour (12:00 PM)</option>
                        <option>24-hour (00:00)</option>
                      </select>
                    </label>
                  </div>

                  {/* Week Start */}
                  <div>
                    <label className="block">
                      <span className="font-bold text-slate-700 mb-2 block">Week Starts On</span>
                      <select
                        value={settings.weekStart}
                        onChange={(e) => handleSelectChange("weekStart", e.target.value)}
                        className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                      <span className="font-bold text-slate-700 mb-2 block">Currency</span>
                      <select
                        value={settings.currency}
                        onChange={(e) => handleSelectChange("currency", e.target.value)}
                        className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

          {/* Save Button */}
          <div className="flex gap-3 pt-8 border-t-2 border-slate-100 mt-8">
            <button className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-300 bg-white text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-400 transition-all">
              Cancel
            </button>
            <button className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 transition-all">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSettings;

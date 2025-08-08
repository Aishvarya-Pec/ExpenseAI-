import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  DollarSign, 
  Bell, 
  Shield, 
  Download, 
  Palette, 
  Settings as SettingsIcon,
  Camera,
  Eye,
  EyeOff,
  RefreshCw,
  Trash2,
  Save,
  Edit3
} from 'lucide-react';
import { Button } from '../ui/Button';
import { CurrencySelector } from '../ui/CurrencySelector';
import { useCurrencyContext } from '../../hooks/useCurrency';
import { useNotificationContext } from '../../hooks/useNotifications';
import { useTheme } from '../../hooks/useTheme';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  phone: string;
  location: string;
  timezone: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  budgetAlerts: boolean;
  expenseReminders: boolean;
  weeklyReports: boolean;
  securityAlerts: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  biometricAuth: boolean;
  sessionTimeout: number;
  loginAlerts: boolean;
}

interface AppPreferences {
  defaultView: 'dashboard' | 'expenses' | 'analytics';
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  numberFormat: 'US' | 'EU' | 'IN';
  autoBackup: boolean;
  dataRetention: number; // in months
}

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { primaryCurrency, setPrimaryCurrency, secondaryCurrency, setSecondaryCurrency } = useCurrencyContext();
  const { clearAll } = useNotificationContext();

  // User Profile State
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    timezone: 'America/New_York'
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    budgetAlerts: true,
    expenseReminders: false,
    weeklyReports: true,
    securityAlerts: true
  });

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    biometricAuth: true,
    sessionTimeout: 30,
    loginAlerts: true
  });

  // App Preferences State
  const [appPreferences, setAppPreferences] = useState<AppPreferences>({
    defaultView: 'dashboard',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: 'US',
    autoBackup: true,
    dataRetention: 12
  });

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [activeTab, setActiveTab] = useState('profile');

  const handleProfileUpdate = () => {
    // Handle profile update logic
    console.log('Profile updated:', profile);
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match');
      return;
    }
    // Handle password change logic
    console.log('Password changed');
    setShowPasswordChange(false);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleDataExport = (format: 'csv' | 'json' | 'pdf') => {
    // Handle data export logic
    console.log(`Exporting data in ${format} format`);
  };

  const handleDataClear = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      clearAll();
      console.log('All data cleared');
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'currency', name: 'Currency', icon: DollarSign },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'preferences', name: 'Preferences', icon: SettingsIcon },
    { id: 'data', name: 'Data & Export', icon: Download }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">User Profile</h2>

            {/* Avatar Section */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-2xl font-bold text-black">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-600">
                  <Camera size={16} />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{profile.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
              </div>
            </div>

            {/* Profile Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="input-enhanced"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="input-enhanced"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  className="input-enhanced"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                  className="input-enhanced"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Timezone
                </label>
                <select
                  value={profile.timezone}
                  onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                  className="input-enhanced"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Asia/Kolkata">India Standard Time (IST)</option>
                  <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                  <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
                </select>
              </div>
            </div>

            {/* Password Change */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Password</h3>
                <Button
                  variant="ghost"
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                >
                  <Edit3 size={16} className="mr-2" />
                  Change Password
                </Button>
              </div>

              {showPasswordChange && (
                <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwords.current}
                      onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                      className="input-enhanced"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                      className="input-enhanced"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                      className="input-enhanced"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button onClick={handlePasswordChange} className="btn-primary">
                      Update Password
                    </Button>
                    <Button variant="ghost" onClick={() => setShowPasswordChange(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button onClick={handleProfileUpdate} className="btn-primary">
                <Save size={16} className="mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        );

      case 'currency':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Currency Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Primary Currency
                </label>
                <CurrencySelector
                  value={primaryCurrency}
                  onChange={setPrimaryCurrency}
                  showRefresh={true}
                  showSecondary={false}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Secondary Currency
                </label>
                <CurrencySelector
                  value={secondaryCurrency}
                  onChange={setSecondaryCurrency}
                  showRefresh={false}
                  showSecondary={false}
                />
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                Currency Display Settings
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-3">
                All amounts will be displayed in your primary currency, with optional conversion to secondary currency.
              </p>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="rounded border-yellow-300 text-yellow-600 focus:ring-yellow-500" />
                  <span className="text-sm text-yellow-700 dark:text-yellow-400">Always show secondary currency</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="rounded border-yellow-300 text-yellow-600 focus:ring-yellow-500" />
                  <span className="text-sm text-yellow-700 dark:text-yellow-400">Auto-refresh exchange rates</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Notification Preferences</h2>

            <div className="space-y-4">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {key === 'emailNotifications' && 'Receive notifications via email'}
                      {key === 'pushNotifications' && 'Receive push notifications on your device'}
                      {key === 'budgetAlerts' && 'Get alerts when approaching budget limits'}
                      {key === 'expenseReminders' && 'Reminders to log daily expenses'}
                      {key === 'weeklyReports' && 'Weekly spending summary reports'}
                      {key === 'securityAlerts' && 'Security-related notifications'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, [key]: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Security Settings</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.twoFactorAuth}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Biometric Authentication</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Use fingerprint or face recognition</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.biometricAuth}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, biometricAuth: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-600"></div>
                </label>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">Session Timeout</h4>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{securitySettings.sessionTimeout} minutes</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: Number(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>5 min</span>
                  <span>120 min</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Login Alerts</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of new device logins</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.loginAlerts}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, loginAlerts: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-600"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Appearance Settings</h2>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Theme</h4>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Current theme: {theme === 'dark' ? 'Dark' : 'Light'}
                  </span>
                  <Button
                    onClick={toggleTheme}
                    variant="ghost"
                    className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                  >
                    {theme === 'dark' ? <Eye size={16} /> : <EyeOff size={16} />}
                    <span className="ml-2">Switch to {theme === 'dark' ? 'Light' : 'Dark'}</span>
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Color Scheme</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Current color scheme: Black, White & Gold
                </p>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-black rounded-full border-2 border-gray-300"></div>
                    <span className="text-sm">Black</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-white rounded-full border-2 border-gray-300"></div>
                    <span className="text-sm">White</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                    <span className="text-sm">Gold</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">App Preferences</h2>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Default Landing Page
                </label>
                <select
                  value={appPreferences.defaultView}
                  onChange={(e) => setAppPreferences(prev => ({ ...prev, defaultView: e.target.value as any }))}
                  className="input-enhanced"
                >
                  <option value="dashboard">Dashboard</option>
                  <option value="expenses">Expenses</option>
                  <option value="analytics">Analytics</option>
                </select>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Date Format
                </label>
                <select
                  value={appPreferences.dateFormat}
                  onChange={(e) => setAppPreferences(prev => ({ ...prev, dateFormat: e.target.value as any }))}
                  className="input-enhanced"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY (EU)</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                </select>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Number Format
                </label>
                <select
                  value={appPreferences.numberFormat}
                  onChange={(e) => setAppPreferences(prev => ({ ...prev, numberFormat: e.target.value as any }))}
                  className="input-enhanced"
                >
                  <option value="US">1,234.56 (US)</option>
                  <option value="EU">1.234,56 (EU)</option>
                  <option value="IN">1,23,456.78 (Indian)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Auto Backup</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Automatically backup data to cloud</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={appPreferences.autoBackup}
                    onChange={(e) => setAppPreferences(prev => ({ ...prev, autoBackup: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-600"></div>
                </label>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">Data Retention</h4>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{appPreferences.dataRetention} months</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="60"
                  value={appPreferences.dataRetention}
                  onChange={(e) => setAppPreferences(prev => ({ ...prev, dataRetention: Number(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>3 months</span>
                  <span>5 years</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Data & Export</h2>

            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="text-lg font-medium text-blue-900 dark:text-blue-300 mb-3">Export Your Data</h3>
                <p className="text-blue-700 dark:text-blue-400 mb-4">
                  Download your expense data in various formats for backup or analysis.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => handleDataExport('csv')}
                    variant="ghost"
                    className="bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  >
                    <Download size={16} className="mr-2" />
                    Export as CSV
                  </Button>
                  <Button
                    onClick={() => handleDataExport('json')}
                    variant="ghost"
                    className="bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  >
                    <Download size={16} className="mr-2" />
                    Export as JSON
                  </Button>
                  <Button
                    onClick={() => handleDataExport('pdf')}
                    variant="ghost"
                    className="bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  >
                    <Download size={16} className="mr-2" />
                    Export as PDF
                  </Button>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h3 className="text-lg font-medium text-green-900 dark:text-green-300 mb-3">Data Backup</h3>
                <p className="text-green-700 dark:text-green-400 mb-4">
                  Create a complete backup of your account data.
                </p>
                <Button
                  onClick={() => console.log('Creating backup...')}
                  variant="ghost"
                  className="bg-white dark:bg-gray-800 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/30"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Create Backup
                </Button>
              </div>

              <div className="p-6 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 rounded-lg">
                <h3 className="text-lg font-medium text-red-900 dark:text-red-300 mb-3">Danger Zone</h3>
                <p className="text-red-700 dark:text-red-400 mb-4">
                  Permanently delete all your data. This action cannot be undone.
                </p>
                <Button
                  onClick={handleDataClear}
                  variant="ghost"
                  className="bg-white dark:bg-gray-800 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete All Data
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your ExpenseAI experience
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg"
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
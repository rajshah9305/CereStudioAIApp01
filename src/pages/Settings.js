import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Settings as SettingsIcon, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User as UserEntity } from '../entities/User';
import ProfileForm from '../components/ProfileForm';
import ApiKeyForm from '../components/ApiKeyForm';

export default function Settings() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: '', email: '', avatar: '' });
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [appName, setAppName] = useState('');
  const [version, setVersion] = useState('');
  const [environment, setEnvironment] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    UserEntity.me().then((user) => {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || ''
      });
    });
    setApiKey(localStorage.getItem('apiKey') || process.env.REACT_APP_CEREBRAS_API_KEY || '');
    setApiUrl(localStorage.getItem('apiUrl') || process.env.REACT_APP_API_URL || 'https://api.cerebras.ai/v1/chat/completions');
    setAppName(localStorage.getItem('appName') || process.env.REACT_APP_APP_NAME || '');
    setVersion(localStorage.getItem('version') || process.env.REACT_APP_VERSION || '');
    setEnvironment(localStorage.getItem('environment') || process.env.REACT_APP_ENVIRONMENT || '');
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleApiKeyFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'apiKey') setApiKey(value);
    else if (name === 'apiUrl') setApiUrl(value);
    else if (name === 'appName') setAppName(value);
    else if (name === 'version') setVersion(value);
    else if (name === 'environment') setEnvironment(value);
  };

  const validate = () => {
    const errs = {};
    if (!profile.name.trim()) errs.name = 'Name is required.';
    if (!profile.email.trim()) errs.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(profile.email)) errs.email = 'Invalid email format.';
    if (!apiKey.trim()) errs.apiKey = 'API key is required.';
    if (!apiUrl.trim()) errs.apiUrl = 'API URL is required.';
    return errs;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    await UserEntity.update(profile);
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('apiUrl', apiUrl);
    localStorage.setItem('appName', appName);
    localStorage.setItem('version', version);
    localStorage.setItem('environment', environment);
    setMessage('Settings saved successfully!');
    localStorage.setItem('app-toast', 'Settings saved successfully!');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleClearData = () => {
    localStorage.clear();
    localStorage.setItem('app-toast', 'All data cleared. You have been logged out.');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center gap-4"
        >
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors" aria-label="Back to previous page">
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            Back
          </button>
          <SettingsIcon className="w-7 h-7 text-orange-500" aria-hidden="true" />
          <h1 className="text-3xl font-bold text-black">Settings</h1>
        </motion.div>

        <form onSubmit={handleSave} className="space-y-8" aria-label="Settings form">
          <ProfileForm profile={profile} errors={errors} onChange={handleProfileChange} />
          <ApiKeyForm
            apiKey={apiKey}
            apiUrl={apiUrl}
            appName={appName}
            version={version}
            environment={environment}
            errors={errors}
            onChange={handleApiKeyFormChange}
          />
          <div className="flex gap-4 mt-8">
            <button type="submit" className="btn-primary flex items-center gap-2" aria-label="Save settings">
              <Save className="w-5 h-5" aria-hidden="true" /> Save
            </button>
            <button type="button" className="btn-secondary" onClick={handleClearData} aria-label="Clear all data and log out">
              Log out / Clear all data
            </button>
          </div>
          {message && <div className="text-green-600 mt-4" role="status">{message}</div>}
        </form>
      </div>
    </div>
  );
} 
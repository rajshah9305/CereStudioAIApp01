import React from 'react';
import PropTypes from 'prop-types';

export default function ProfileForm({ profile, errors, onChange }) {
  return (
    <section className="card p-6" aria-labelledby="profile-section">
      <h2 id="profile-section" className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
        Profile
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            id="profile-name"
            type="text"
            name="name"
            value={profile.name}
            onChange={onChange}
            className="input-field"
            required
            aria-required="true"
            aria-invalid={!!errors.name}
          />
          {errors.name && <div className="text-red-600 text-xs mt-1" role="alert">{errors.name}</div>}
        </div>
        <div>
          <label htmlFor="profile-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="profile-email"
            type="email"
            name="email"
            value={profile.email}
            onChange={onChange}
            className="input-field"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
          />
          {errors.email && <div className="text-red-600 text-xs mt-1" role="alert">{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="profile-avatar" className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
          <input
            id="profile-avatar"
            type="text"
            name="avatar"
            value={profile.avatar}
            onChange={onChange}
            className="input-field"
            aria-describedby="avatar-desc"
          />
          <span id="avatar-desc" className="text-xs text-gray-500">Paste a direct image URL for your avatar.</span>
          {profile.avatar && (
            <img src={profile.avatar} alt="Avatar preview" className="mt-2 w-12 h-12 rounded-full border" />
          )}
        </div>
      </div>
    </section>
  );
}

ProfileForm.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string
  }).isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired
}; 
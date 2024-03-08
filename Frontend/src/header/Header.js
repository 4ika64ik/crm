import React from 'react';
import { useState } from 'react';
import './style.css'

const ProfileHeader = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    profession: 'Software Engineer',
    profileImage: 'profile-picture.jpg'
  });

  return (
    <div className="profile-header">
      <img src={user.profileImage} alt="Profile Picture" />
      <div className="profile-info">
        <h2>{user.name}</h2>
        <p>{user.profession}</p>
        <a href="#">Edit Profile</a>
      </div>
    </div>
  );
};

export default ProfileHeader;

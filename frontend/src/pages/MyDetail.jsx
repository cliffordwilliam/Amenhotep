import React from 'react';
import { Link } from 'react-router-dom';

export default function MyDetail() {
  // Retrieve user details from local storage
  const userId = localStorage.getItem('id');
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  const profile_picture = localStorage.getItem('profile_picture');
  const bio = localStorage.getItem('bio');
  const credit = localStorage.getItem('credit');
  const created_at = localStorage.getItem('created_at');
  const updated_at = localStorage.getItem('updated_at');

  // Create an array of objects containing key-value pairs for each user detail
  const userDetails = [
    { label: 'User ID', value: userId },
    { label: 'Username', value: username },
    { label: 'Email', value: email },
    // { label: 'Profile Picture', value: profile_picture },
    { label: 'Bio', value: bio },
    { label: 'Credit', value: credit },
    { label: 'Created At', value: created_at },
    { label: 'Updated At', value: updated_at },
  ];

  return (
    <div className='card flex-0 m'>
      <Link to={`/editMyDetail`}>
        <button>Edit</button>
      </Link>
      {/* Conditionally render the profile picture */}
      {profile_picture && (
                    <img
                      src={profile_picture}
                      alt="Profile Picture"
                    />
                  )}
      <ul>
        {/* Loop over userDetails and create an <li> for each user detail */}
        {userDetails.map((detail) => (
          <li key={detail.label}>
            <strong>{detail.label}:</strong> {detail.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

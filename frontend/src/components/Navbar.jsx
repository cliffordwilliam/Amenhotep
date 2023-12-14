import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APIrequest } from '../Store/apiSlice';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import c from '../const';

export default function PublicNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onLogout(e) {
    e.preventDefault();
    // remove token and user data from memory, go to login
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('profile_picture');
    localStorage.removeItem('bio');
    localStorage.removeItem('credit');
    // go to login
    navigate('/login');
  }

  function onDelete(e) {
    e.preventDefault();
    // delete user from the database
    dispatch(
      APIrequest({
        method: 'DELETE',
        apiEndpoint: `${c.localBaseUrl}/user`,
        options: {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        },
      })
    );
    // remove token and user data from memory, go to login
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('profile_picture');
    localStorage.removeItem('bio');
    localStorage.removeItem('credit');
    // go to login
    navigate('/login');
  }
console.log(localStorage.profile_picture.length);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/myDetail">My detail</Link>
        </li>
        <li>
          <Link to="/chatRooms">Chat rooms</Link>
        </li>
        <li>
          {/* Conditionally render the profile picture */}
          {localStorage.profile_picture.length !== 0 && (
            <img
              src={localStorage.profile_picture}
              alt="Profile Picture"
            />
          )}
          <p>
            Username: {localStorage.username}
            <br />
            Email: {localStorage.email}
            <br />
            Bio: {localStorage.bio}
            <br />
            Credit: {localStorage.credit}
          </p>
        </li>
        <li>
          <button onClick={onLogout}>Logout</button>
        </li>
        <li>
          <button onClick={onDelete}>Delete Account</button>
        </li>
      </ul>
    </nav>
  );
}

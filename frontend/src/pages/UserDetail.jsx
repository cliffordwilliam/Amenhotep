import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../components/Modal';
import { useParams } from 'react-router-dom';
import { APIrequest } from '../Store/apiSlice';
import c from "../const";

export default function UsersDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");

  const handleApiRequestComplete = (data, error) => {
    if (data) {
      // Handle success
      setUser(data.user);
    } else {
      // Handle error
      // (nothing specific to do in this case)
    }
  };

  useEffect(() => {
    // Dispatch the API request with the user ID as part of the endpoint
    dispatch(
      APIrequest({
        method: 'GET',
        apiEndpoint: `${c.localBaseUrl}/user/${id}`,
        options: {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        },
        callbackArray: [
          handleApiRequestComplete
        ],
      })
    );
  }, [dispatch, id]);

  return (
    <>
      <h1>User Detail</h1>

      {/* Display loading indicator if data is still loading */}
      {!user && <p>Loading...</p>}

      {/* Display the modal if there's an error */}
      {<Modal />}

      {/* Display the user details if data is available */}
      {user && (
        <ul>
          <li key={user.id}>
            <strong>{user.username}</strong>
            <p>Email: {user.email}</p>
          </li>
        </ul>
      )}
    </>
  );
}

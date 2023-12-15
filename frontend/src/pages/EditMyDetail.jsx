import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { APIrequest } from '../Store/apiSlice';
import c from '../const';
import Modal from '../components/Modal';

export default function EditMyDetail() {
  const dispatch = useDispatch();
  const [newUsername, setNewUsername] = useState(localStorage.getItem('username') || '');
  const [newBio, setNewBio] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [imgUrl, setimgUrl] = useState('');

  const handleApiRequestComplete = (data, error) => {
    if (data) {
      // Handle success
      // update the local
      localStorage.setItem('username',data.user.username);
      localStorage.setItem('bio',data.user.bio);
    } else {
      // Handle error
      // (nothing specific to do in this case)
    }
  };

  const handlePatchApiRequestComplete = (data, error) => {
    if (data) {
      // Handle success
      // update the local
      localStorage.setItem('profile_picture',data.user.profile_picture);
    } else {
      // Handle error
      // (nothing specific to do in this case)
    }
  };

  function onimgUrlInputChange(event) {
    setimgUrl(event.target.files[0])
}

  const handleSaveChanges = () => {
    // req body
    let pass;
    if (newPassword !== '') pass = newPassword;
    const requestBody = {
      username: newUsername,
      bio: newBio,
      password: pass,
    };

    // PUT
    dispatch(
      APIrequest({
        method: 'PUT',
        apiEndpoint: `${c.localBaseUrl}/user`,
        options: {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
          data: requestBody,
        },
        updateContentOnSuccess:true,
        callbackArray: [
          handleApiRequestComplete
        ],
      })
    );
  };

  const handleUpdateProfilePicture = () => {
    const formData = new FormData();
    formData.append("profile_picture", imgUrl);
  
    // const formData = new FormData()
    // formData.append("file", imgUrl)
    // setIsUploading(true)
    // console.log(formData.imgUrl, "<<<<"); // C:\fakepath\ken-kaneki.jpg
    // const response = await axios.patch(`${baseUrl}/apis/rent-room/lodgings/${id}`, formData, config)

    // need to save the new URL to the img link
    dispatch(
      APIrequest({
        method: 'PATCH',
        apiEndpoint: `${c.localBaseUrl}/user`,
        options: {
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.token}`,
          },
        },
        updateContentOnSuccess:true,
        callbackArray: [
          handlePatchApiRequestComplete
        ],
      })
    );
  };
  

  return (
    <div className='card m flex-0'>
      <h1>Edit My Detail</h1>
      <label htmlFor="newUsername">New Username:</label>
      <input
        type="text"
        id="newUsername"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />

      <label htmlFor="newBio">New Bio:</label>
      <textarea
        id="newBio"
        value={newBio}
        onChange={(e) => {setNewBio(e.target.value);}}
      />

      <label htmlFor="newPassword">New Password:</label>
      <input
        type="password"
        id="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <label htmlFor="imgUrl">New Profile Picture:</label>
      <input onChange={onimgUrlInputChange} type="file" id="imgUrl" />

      {/* Display the current credit value */}
      <label htmlFor="newCredit">Current Credit:</label>
      <input
        type="text"
        id="newCredit"
        value={localStorage.getItem('credit')}
        readOnly
        disabled
      />

      <button onClick={handleUpdateProfilePicture}>Update Profile Picture</button>

      <button onClick={handleSaveChanges}>Save Changes</button>
      {<Modal />}
    </div>
  );
}

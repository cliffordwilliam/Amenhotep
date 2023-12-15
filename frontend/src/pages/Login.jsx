import { useState } from "react";
import { useDispatch } from "react-redux";
import { APIrequest } from '../Store/apiSlice';
import c from "../const";
import Modal from "../components/Modal";
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [email, setStateEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Define callback function
  const handleGoogleApiRequestComplete = (data, error) => {
    if (data) {
      // Handle success

        // Save user data to mem
        const {id,username,email,profile_picture,bio,credit} = data.user
        localStorage.setItem('id', id);
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('profile_picture', "");
        localStorage.setItem('bio', bio);
        localStorage.setItem('credit', credit);
        // Save token to mem
        localStorage.setItem('token', data.token);
        // Navigate to home
        navigate('/');
    } else {
      // Handle error
      // (nothing specific to do in this case)
    }
  };
  const handleApiRequestComplete = (data, error) => {
    if (data) {
      // Handle success

      // Save user data to mem
      const {id,username,email,profile_picture,bio,credit} = data.user
      localStorage.setItem('id', id);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('profile_picture', "");
      localStorage.setItem('bio', bio);
      localStorage.setItem('credit', credit);

      // Save token to mem
      localStorage.setItem('token', data.token);

      // Navigate to home
      navigate('/');
    } else {
      // Handle error
      // (nothing specific to do in this case)
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const options = {
      data: {
        email,
        password,
      },
    };

    dispatch(APIrequest({
      method: "POST",
      apiEndpoint: `${c.localBaseUrl}/user/login`,
      options,
      callbackArray: [
        handleApiRequestComplete
      ],
    }));
  };

  async function googleLogin(codeResponse) {
    try {
        console.log(codeResponse);
        dispatch(APIrequest({
          method: "POST",
          apiEndpoint: `${c.localBaseUrl}/user/googleLogin`,
          options: {
            headers: {
              token: codeResponse.credential
            }
          },
          callbackArray: [
            handleGoogleApiRequestComplete
          ],
        }));
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: "error",
            title: error.response.data.message,
        });
    }
}

  return (
    <>
      <h1>Login Form</h1>
      <form className="card flex-0">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setStateEmail(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="button" onClick={submitForm}>Login</button>
      </form>
      <div className="google"> 
      <GoogleLogin onSuccess={googleLogin} />
      </div>
      {<Modal />}
    </>
  );
}

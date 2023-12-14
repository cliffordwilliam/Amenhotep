import { useState } from "react";
import { useDispatch } from "react-redux";
import { APIrequest } from '../Store/apiSlice';
import c from "../const";
import Modal from "../components/Modal";

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    const options = {
      data: {
        email,
        password,
        username,
      },
    };

    dispatch(APIrequest({
      method: "POST",
      apiEndpoint: `${c.localBaseUrl}/user/register`,
      options,
      updateContentOnSuccess: true,
    }));
  };

  return (
    <>
      <h1>Registration Form</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="button" onClick={submitForm}>Register</button>
      </form>
      {<Modal />}
    </>
  );
}

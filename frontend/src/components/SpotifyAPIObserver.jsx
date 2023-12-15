import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { APIrequest } from '../Store/apiSlice';

let isDone = false

export default function SpotifyAPIObserver(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const dispatch = useDispatch();

  const handleApiRequestComplete = (data, error) => {
    if (data) {
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
      setExpiresIn(data.expires_in);
    } else {
      // Handle error
      console.log(error);
    }
  };

  const handleRefreshApiRequestComplete = (data, error) => {
    if (data) {
      console.log(data, "REFRESH");
    } else {
      // Handle error
      console.log(error);
    }
  };

  useEffect(() => {
    if (isDone) return
    isDone = true
    const requestData = {
      client_id: "c427c4dced8b46f092bea016eb4ab5a0",
      client_secret: "12fbed6aadfd45089db0787369dfd7df",
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: "https://amenhotep-8ccvf23hu-cliffordwilliams-projects.vercel.app/spotify",
    };

    dispatch(APIrequest({
      method: "POST",
      apiEndpoint: `https://accounts.spotify.com/api/token`,
      options: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: requestData
      },
      callbackArray: [
        handleApiRequestComplete
      ],
    }));
  }, []);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      const requestData = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      };

      const urlEncodedData = new URLSearchParams(requestData).toString();

      dispatch(APIrequest({
        method: "POST",
        apiEndpoint: `https://accounts.spotify.com/api/token`,
        options: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa("c427c4dced8b46f092bea016eb4ab5a0" + ':' + "12fbed6aadfd45089db0787369dfd7df"),
          },
          data: urlEncodedData
        },
        callbackArray: [
          handleRefreshApiRequestComplete
        ],
      }));
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}

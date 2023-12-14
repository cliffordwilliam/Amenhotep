import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APIrequest } from "../Store/apiSlice";
import c from "../const";
import io from "socket.io-client";
import { useParams } from 'react-router-dom';



export default function VelvetRoom() {
  const { id } = useParams();
  const socket = io.connect(c.localBaseUrl); // c.AmenhotepBaseUrl (LIVE)
  useEffect(() => {
    // Establish a WebSocket connection to your backend
    socket.emit("join_room", +id);
  }, []);

  const dispatch = useDispatch();
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");

  // Define callback function
  const handleApiRequestComplete = (data, error) => {
    if (data) {
      // Handle success
      setChats(data.chats);
      socket.emit("send_message", data={chats:data.chats,room:+id});
    } else {
      // Handle error
      // (nothing specific to do in this case)
    }
  };

  

  useEffect(()=>{
    socket.on(
      "receive_message",
      (chats) => {
        setChats(chats);
      },
      [socket]
    );
  })

  const onPostChatComplete = (data, error) => {
    if (data) {
      // Handle success
      // GET Chat - Bearer token needed

      dispatch(
        APIrequest({
          method: "GET",
          apiEndpoint: `${c.localBaseUrl}/chat/${+id}`,
          options: {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          },
          callbackArray: [handleApiRequestComplete],
        })
      );
    } else {
      // Handle error
      // (nothing specific to do in this case)
    }
  };

  // Function to handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      APIrequest({
        method: "POST",
        apiEndpoint: `${c.localBaseUrl}/chat`,
        options:{
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
          data: {
            chat_room_id: +id,
            message: message,
          },
        },
        callbackArray: [onPostChatComplete],
      })
    );

    // Clear the message input after submission
    setMessage("");
  };

  useEffect(() => {
    // GET Chat - Bearer token needed
    dispatch(
      APIrequest({
        method: "GET",
        apiEndpoint: `${c.localBaseUrl}/chat/${+id}`,
        options: {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        },
        callbackArray: [handleApiRequestComplete],
      })
    );
  }, [dispatch]);

  const chatRoomTitles = {
    1: 'Velvet Room',
    2: 'Tartarus Lounge',
    3: 'Duodecim Pub',
  };

  const chatRoomTitle = chatRoomTitles[+id];

  return (
    <div>
      <h1>{chatRoomTitle}</h1>
      {chats.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
            <ul>
            {chats.map((chat) => (
                <li key={chat.id}>
                <div>
                    <strong>{chat.User.username}:</strong> {chat.message}
                </div>
                <div>
                    Sent at: {new Date(chat.createdAt).toLocaleString()}
                </div>
                </li>
            ))}
            </ul>
        </>
      )}
      {/* Form for posting messages */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">New Message:</label>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

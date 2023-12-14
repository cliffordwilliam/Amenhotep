import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APIrequest } from "../Store/apiSlice";
import { Link } from "react-router-dom";
import c from "../const";

export default function ChatRooms() {
  const dispatch = useDispatch();
  const [chatRooms, setChatRooms] = useState([]);

  // Define callback function
  const handleApiRequestComplete = (data, error) => {
    if (data) {
      // Handle success
      setChatRooms(data.chatRooms)
    } else {
      // Handle error
      // (nothing specific to do in this case)
    }
  };

  useEffect(() => {
      dispatch(
        APIrequest({
          method: "GET",
          apiEndpoint: `${c.localBaseUrl}/chatRoom`,
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
  }, [dispatch]);

  return (
    <div>
      <h1>Chat Rooms</h1>
      {chatRooms.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {chatRooms.map((chatRoom) => (
            <li key={chatRoom.id}>
              <Link to={`/chatRoom/${chatRoom.id}`}>{chatRoom.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
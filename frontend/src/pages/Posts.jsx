import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { APIrequest } from '../Store/apiSlice';
import c from "../const";
import Modal from "../components/Modal";

export default function Posts() {
  const [posts, setPosts] = useState("");
  const [post,setPost] = useState("");

  const handleApiRequestComplete = (data, error) => {
    if (data) {
      // Handle success
      setPosts(data.posts);
    } else {
      // Handle error
      // (nothing specific to do in this case)
    }
  };

  const onPostChatComplete = (data, error) => {
    if (data) {
      // Handle success
      dispatch(APIrequest({
        method: "GET",
        apiEndpoint: `${c.localBaseUrl}/post`,
        options: {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        },
        callbackArray: [
          handleApiRequestComplete
        ],
      }));
    //   setPosts(data.posts);
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
            apiEndpoint: `${c.localBaseUrl}/post`,
            options:{
              headers: {
                Authorization: `Bearer ${localStorage.token}`,
              },
              data: {
                content: post,
              },
            },
            callbackArray: [onPostChatComplete],
          })
        );
    
        // Clear the message input after submission
        setPost("");
      };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(APIrequest({
      method: "GET",
      apiEndpoint: `${c.localBaseUrl}/post`,
      options: {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      },
      callbackArray: [
        handleApiRequestComplete
      ],
    }));
  }, [dispatch]);

  return (
    <>
      <h1>All posts</h1>

            {/* Form for posting messages */}
            <form onSubmit={handleSubmit}>
        <label htmlFor="post">New Post:</label>
        <textarea
          id="post"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>

      {/* Display the posts if data is available */}
      {posts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="h-flex">  
            {posts.map(post => (
                <li className="card" key={post.id}>
                  <strong>{post.User.username}</strong>
                  <p>{post.content}</p>
                  <p>{post.createdAt}</p>
                  <p>{post.updatedAt}</p>
                  <Link to={`/postDetail/${post.id}`}>
                    <button>View Details</button>
                  </Link>
                </li>
              ))}
          </ul>
        </>
      )}

      {<Modal />}
    </>
  );
}

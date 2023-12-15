import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../components/Modal';
import { useParams } from 'react-router-dom';
import { APIrequest } from '../Store/apiSlice';
import c from "../const";
import { setContent, clearContent } from '../Store/modalSlice';

export default function PostDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const [content, setContent] = useState('');
  const [Commentcontent, setCommentContent] = useState('');
  const [Comments, setComments] = useState('');
  const [editComment, setEditCommentContent] = useState('');

  const handleEditCommentApiRequestComplete = (data, error) => {
    if (data) {
      // Handle success
      setEditCommentContent("");
      dispatch(
        APIrequest({
          method: 'GET',
          apiEndpoint: `${c.localBaseUrl}/comment/${id}`,
          options: {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          },
          callbackArray: [
            handleCommentsApiRequestComplete
          ],
        })
      );
    } else {
      // Handle error
      // (nothing specific to do in this case)
    }
  };

  const handleCommentsApiRequestComplete = (data, error) => {
    if (data) {
      // Handle success
      setComments(data.comments);
    } else {
      // Handle error
      // (nothing specific to do in this case)
    }
  };

  const handleApiRequestComplete = (data, error) => {
    if (data) {
      // Handle success
      setPost(data.post);
    } else {
      // Handle error
      // (nothing specific to do in this case)
    }
  };

  const handleDeleteApiRequestComplete = (data, error) => {
    if (data) {
      // Handle success
      setPost(undefined);
    } else {
      // Handle error
      // (nothing specific to do in this case)
    }
  };

  const handleCoomentApiRequestComplete = (data, error) => {
    if (data) {
      // Handle success
      setCommentContent("");
      // Dispatch the API request with the user ID as part of the endpoint
      dispatch(
        APIrequest({
          method: 'GET',
          apiEndpoint: `${c.localBaseUrl}/comment/${id}`,
          options: {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          },
          callbackArray: [
            handleCommentsApiRequestComplete
          ],
        })
      );
    } else {
      // Handle error
      // (nothing specific to do in this case)
    }
  };

  const submitForm = () => {
    // Dispatch the API request with the user ID as part of the endpoint
    // req body
    const requestBody = {
      content: content,
    };
    dispatch(
      APIrequest({
        method: 'PATCH',
        apiEndpoint: `${c.localBaseUrl}/post/${id}`,
        options: {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
          data: requestBody
        },
        callbackArray: [
          handleApiRequestComplete
        ],
      })
    );
  };

  const submitCommentEditForm = (e, commentId) => {
    e.preventDefault();
    // Dispatch the API request with the user ID as part of the endpoint
    // req body
    const requestBody = {
      content: editComment,
    };
    dispatch(
      APIrequest({
        method: 'PATCH',
        apiEndpoint: `${c.localBaseUrl}/comment/${commentId}`,
        options: {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
          data: requestBody
        },
        callbackArray: [
          handleEditCommentApiRequestComplete
        ],
      })
    );
  };

  const submitCommentForm = () => {
    // Dispatch the API request with the user ID as part of the endpoint
    // req body
    const requestBody = {
      content: Commentcontent,
      post_id: +id
    };
    dispatch(
      APIrequest({
        method: 'POST',
        apiEndpoint: `${c.localBaseUrl}/comment`,
        options: {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
          data: requestBody
        },
        callbackArray: [
          handleCoomentApiRequestComplete
        ],
      })
    );
  };

  const onCommentDelete = (e, commentId) => {
    e.preventDefault();
    // Dispatch the API request with the user ID as part of the endpoint
    // req body
    dispatch(
      APIrequest({
        method: 'DELETE',
        apiEndpoint: `${c.localBaseUrl}/comment/${commentId}`,
        options: {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        },
        callbackArray: [
          handleDeleteApiRequestComplete
        ],
      })
    );
  };

  const onDelete = () => {
    // Dispatch the API request with the user ID as part of the endpoint
    // req body
    dispatch(
      APIrequest({
        method: 'DELETE',
        apiEndpoint: `${c.localBaseUrl}/post/${id}`,
        options: {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        },
        callbackArray: [
          handleDeleteApiRequestComplete
        ],
      })
    );
  };

  useEffect(() => {
    // Dispatch the API request with the user ID as part of the endpoint
    dispatch(
      APIrequest({
        method: 'GET',
        apiEndpoint: `${c.localBaseUrl}/post/${id}`,
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

    // Dispatch the API request with the user ID as part of the endpoint
    dispatch(
      APIrequest({
        method: 'GET',
        apiEndpoint: `${c.localBaseUrl}/comment/${id}`,
        options: {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        },
        callbackArray: [
          handleCommentsApiRequestComplete
        ],
      })
    );
  }, []);

  return (
    <>
      <h1>Post Detail</h1>

      {/* Display loading indicator if data is still loading */}
      {!post && <p>Loading...</p>}

      {/* Display the modal if there's an error */}
      {<Modal />}

      {/* Display the user details if data is available */}
      {post && (
        <div className="card m" key={post.id}>
          <h2>{post.User.username}</h2>
          <p>{post.content}</p>
          <p>CreatedAt: {post.createdAt}</p>
          <p>UpdatedAt: {post.updatedAt}</p>
        </div>
      )}

      {post && post.User.id === +localStorage.id ? (
        <div className="card m">
          <h1>Edit Form</h1>
          <form>
            <label htmlFor="content">content:</label>
            <input type="content" id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} required />
            <button type="button" onClick={submitForm}>Save</button>
            <button onClick={onDelete}>Delete</button>
          </form>
        </div>
      ) : (
        <p>Can't edit</p>
      )}

<hr />

      {/* Display the posts if data is available */}
      {Comments.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {Comments.map(comment => (
              <div className="card m" key={comment.id}>
                <li>
                  <strong>{comment.User.username}</strong>
                  <p>{comment.content}</p>
                  <p>{comment.createdAt}</p>
                  <p>{comment.updatedAt}</p>
                </li>
                {comment.user_id && comment.user_id === +localStorage.id ? (
                <>
                <form key={`edit-comment-form-${comment.id}`}>
                  <label htmlFor="content">edit comment:</label>
                  <input type="content" id="content" name="content" onChange={(e) => setEditCommentContent(e.target.value)} required />
                  <button type="button" onClick={(e) => { submitCommentEditForm(e, comment.id) }}>Save</button>
                <button onClick={(e) => { onCommentDelete(e, comment.id) }}>Delete</button>
                </form>
                </>
                ) : (
                    <p>Can't edit</p>
                )}
              </div>
            ))}
          </ul>
        </>
      )}
<div className="card m">
  
      <h1>Add comment</h1>
      <form>
        <label htmlFor="commentContent">commentContent:</label>
        <input type="commentContent" id="commentContent" name="commentContent" value={Commentcontent} onChange={(e) => setCommentContent(e.target.value)} required />
        <button type="button" onClick={submitCommentForm}>Add</button>
      </form>
</div>
    </>
  );
}

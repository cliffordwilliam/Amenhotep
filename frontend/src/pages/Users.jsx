import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { APIrequest } from '../Store/apiSlice';
import c from "../const";
import Modal from "../components/Modal";

export default function Register() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchUsername, setSearchUsername] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortField, setSortField] = useState('id');
  const [users, setUsers] = useState("");

  const handleApiRequestComplete = (data, error) => {
    if (data) {
      // Handle success
      setUsers(data.users);
    } else {
      // Handle error
      // (nothing specific to do in this case)
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(APIrequest({
      method: "GET",
      apiEndpoint: `${c.localBaseUrl}/user?username=${searchUsername}&limit=${limit}&page=${currentPage}&sort=${sortOrder}&sortField=${sortField}`,
      options: {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      },
      callbackArray: [
        handleApiRequestComplete
      ],
    }));
  }, [dispatch, currentPage, limit, searchUsername, sortOrder, sortField]);

  return (
    <>
      <h1>All users</h1>
      <div>
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by username"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
        />

        {/* Pagination controls */}
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
      </div>

      <div>
        {/* Limit dropdown (for changing items per page) */}
        <label htmlFor="limit">Items per page:</label>
        <select id="limit" value={limit} onChange={(e) => setLimit(e.target.value)}>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>

        {/* Sorting options */}
        <label htmlFor="sortOrder">Sort Order:</label>
        <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        {/* Sorting field options */}
        <label htmlFor="sortField">Sort Field:</label>
        <select id="sortField" value={sortField} onChange={(e) => setSortField(e.target.value)}>
          <option value="username">username</option>
          <option value="email">email</option>
          <option value="credit">credit</option>
          <option value="id">id</option>
        </select>
      </div>

      {/* Display the users if data is available */}
      {users.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>  
            {users.map(user => (
                <li key={user.id}>
                  <strong>{user.username}</strong>
                  <p>Email: {user.email}</p>
                  <Link to={`/user/detail/${user.id}`}>
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

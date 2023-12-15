import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { APIrequest } from '../Store/apiSlice';
import c from "../const";
import Modal from "../components/Modal";
import badTouch from '../assets/Bad_Touch.webp'

export default function Drinks() {
  const [drinks, setDrinks] = useState("");

  const handleApiRequestComplete = (data, error) => {
    if (data) {
      // Handle success
      setDrinks(data.drinks);
    } else {
      // Handle error
      // (nothing specific to do in this case)
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(APIrequest({
      method: "GET",
      apiEndpoint: `${c.localBaseUrl}/drink`,
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
      <h1>All drinks</h1>

      {/* Display the drinks if data is available */}
      {drinks.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="h-flex">  
            {drinks.map(drink => (
                <li className="card" key={drink.id}>
                  <strong>{drink.name}</strong>
                  <p>{drink.description}</p>
                  <p>{drink.price}</p>

                    <img
                      src={badTouch}
                      alt={drink.name}
                    />
                </li>
              ))}
          </ul>
        </>
      )}

      {<Modal />}
    </>
  );
}

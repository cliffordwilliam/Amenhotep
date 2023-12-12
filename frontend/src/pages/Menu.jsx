import { useState, useEffect } from "react";

import Item from "../components/Item";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenus } from "../store/menuSlice";

function Menu() {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector(state => state.menu)

  useEffect(() => {
    dispatch(fetchMenus())
  }, []);

  return (
    <>
      <div className="container">
        <header className="is-flex is-flex-direction-row is-justify-content-space-between mb-4">
          <h1 className="is-size-3">List of menu</h1>
          <button className="button is-primary">Add Item</button>
        </header>

        {/* Jika error variable berisi nilai, tampilkan pesan error */}
        {error && <div className="notification is-danger">{error}</div>}

        <main className="columns is-multiline">
          {/* Jika nilai loading true, tampilkan pesan loading */}
          {loading ? (
            <h1 className="column title">Sedang memuat data...</h1>
          ) : (
            data.map((item) => (
              <div
                key={item.id}
                className="column is-one-quarter-tablet is-one-fifth-desktop"
              >
                <Item {...item} />
              </div>
            ))
          )}
        </main>
      </div>
    </>
  );
}

export default Menu;
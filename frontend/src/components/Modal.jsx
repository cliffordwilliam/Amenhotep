import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearContent } from '../Store/modalSlice';

export default function Modal() {
  const { content } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  if (!content) return null; // Return early if there's no content

  return (
    <div className="modal">
      <div className="modal-window">
        <h2>Modal</h2>
        <p>{content}</p>
        <button onClick={() => dispatch(clearContent())}>Close</button>
      </div>
    </div>
  );
}

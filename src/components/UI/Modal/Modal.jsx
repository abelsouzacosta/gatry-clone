import React from "react";

import ReactDOM from "react-dom";

import "./Modal.css";

const UIModal = ({ isOpen, children, onClickClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="ui-modal__overlay">
      <div className="ui-modal">
        <button
          type="button"
          className="ui-modal__close-button"
          onClick={onClickClose}
        >
          x
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default UIModal;

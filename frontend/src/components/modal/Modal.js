import React, { useEffect, useState } from "react";
import "./Modal.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
export const Modal = (props) => {
  const [showModal, setShowModal] = useState(props.show);

  return (
    <div
      onClick={() => props.closeModal()}
      className={props.show ? "modal-wrapper" : "hidden"}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={props.show ? "modal" : "hidden"}
        {...props}
      >
        <AiOutlineCloseCircle
          className="topcorner"
          onClick={() => props.closeModal()}
        />
        {props.children}
      </div>
    </div>
  );
};

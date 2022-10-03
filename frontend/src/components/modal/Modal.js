import React, { useEffect, useState } from "react";
import "./Modal.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const Modal = ({ closemodal, children, show }) => {
  return (
    <div onClick={closemodal} className={show ? "modal-wrapper" : "hidden"}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={show ? "modal" : "hidden"}
      >
        <AiOutlineCloseCircle className="topcorner" onClick={closemodal} />
        {children}
      </div>
    </div>
  );
};

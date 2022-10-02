import React, { useEffect, useState } from "react";
import "./Modal.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const Modal = (props) => {
  return (
    <div
      onClick={props.closemodal}
      className={props.show ? "modal-wrapper" : "hidden"}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={props.show ? "modal" : "hidden"}
        {...props}
      >
        <AiOutlineCloseCircle
          className="topcorner"
          onClick={props.closemodal}
        />
        {props.children}
      </div>
    </div>
  );
};

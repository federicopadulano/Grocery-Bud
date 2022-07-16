import React, { useEffect } from "react";

const Alert = ({ msg, type, clearAlert }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      clearAlert();
    }, 3000);
    return (()=> clearTimeout(timeOut))
  }, []);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;

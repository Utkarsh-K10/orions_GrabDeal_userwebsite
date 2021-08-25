import React, { useState } from "react";
import zxcvbn from "zxcvbn";

const PasswordCheckerCorpo = ({ password, trigger }) => {
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;
  console.log("triggered", trigger);
  const createPassLabel = () => {
    switch (testResult.score) {
      case 0:
        return "Very weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return "#828282";
      case 1:
        return "#EA1111";
      case 2:
        return "#FFAD00";
      case 3:
        return "#9bc158";
      case 4:
        return "#00b500";
      default:
        return "none";
    }
  };

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: "10px",
  });

  return (
    <>
      {" "}
      <p style={{ color: funcProgressColor() }}>
        Password Strength-{createPassLabel()}
      </p>
      <p>
        {trigger &&
        (createPassLabel() === "Weak" || createPassLabel() === "Very weak")
          ? "Password should contain uppercase and lowercase letters, numbers, and symbols."
          : ""}
      </p>
      <div className="corpoPassCheck" style={{ height: "10px" }}>
        <div className="progress-bar" style={changePasswordColor()}></div>
      </div>
    </>
  );
};

export default PasswordCheckerCorpo;

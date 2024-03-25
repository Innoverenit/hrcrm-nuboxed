// JumpStartBox.js

import React from "react";

const JumpStartColor = ({ bgColor, noProgress, title, isLoading, color }) => {
  return (
    <div
      className="flex justify-center items-center flex-col rounded-lg text-center p-4 m-4"
      style={{ background: bgColor, color: color }}
    >
      <h3>{title}</h3>
      {noProgress ? null : <div>Loading...</div>}
    </div>
  );
};

export default JumpStartColor;

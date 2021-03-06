import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";

function ControlledPopup(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {}, []);

  return (
    <Popup open modal closeOnDocumentClick>
      <div>
        <h1>
          {" "}
          Thank you Mary for creating a new task! Your team mates will help you.{" "}
        </h1>
        <br></br>
        <Link to="/Home">
          <button>Close</button>
        </Link>
      </div>
    </Popup>
  );
}
export default ControlledPopup;

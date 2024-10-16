import React, { useState, useEffect } from "react";
import { Switch, Input } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url2 } from "../../../../Config/Auth";

function MaterialFastMovingToggle(props) {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [maxOdU, setMaxOdU] = useState("");

  useEffect(() => {
    // Check if props.maxOdU exists and is greater than 0, then show the input
    if (props.maxOdU && props.maxOdU > 0) {
      setIsInputVisible(true); 
      setMaxOdU(props.maxOdU); // Set the initial input value from props
    } else {
      setIsInputVisible(false); 
      setMaxOdU(""); // Clear the input value
    }
  }, [props.maxOdU]); // Run this effect whenever props.maxOdU changes

  // useEffect(() => {
  //   // Show the input if maxOdU is defined, even if it's 0
  //   if (props.maxOdU !== undefined && props.maxOdU !== null) {
  //     setIsInputVisible(true);
  //     setMaxOdU(props.maxOdU); // Set the initial input value from props
  //   } else {
  //     setIsInputVisible(false);
  //     setMaxOdU(""); // Clear the input value
  //   }
  // }, [props.maxOdU]);

  const sendFirstMovingData = () => {
    const payload = {
      maxOdU:maxOdU,
      type: "material",
      productId: props.suppliesId,
    };

    axios
      .put(`${base_url2}/supplies/fastMovingGoods`, payload, {
        headers: {
          Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
        },
      })
      .then((response) => {
        console.log("PUT successful", response.data);
      })
      .catch((error) => {
        console.error("PUT failed", error);
      });
  };

  const handleToggleChange = (checked) => {
    setIsInputVisible(checked); 
    if (!checked) {
      setMaxOdU(""); // Clear input when toggled to "No"
    }
  };

  const handleInputBlur = () => {
    if (maxOdU) {
      sendFirstMovingData(); 
    }
  };

  const handleInputChange = (e) => {
    setMaxOdU(e.target.value); 
  };

  return (
    <div>
      <Switch
        className="toggle-clr"
        checked={isInputVisible}
        checkedChildren="Yes"
        unCheckedChildren="No"
        onChange={handleToggleChange}
      />

      {isInputVisible && (
        <Input
          placeholder="Enter details"
          value={maxOdU} 
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          style={{ marginTop: "0.5rem", width: "6rem" }}
        />
      )}
    </div>
  );
}

const mapStateToProps = ({ auth, supplies }) => ({
  // Map your state here if needed
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // Map your action creators here if needed
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialFastMovingToggle);

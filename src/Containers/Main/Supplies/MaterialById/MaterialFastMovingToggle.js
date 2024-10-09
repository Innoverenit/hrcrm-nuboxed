// import React, { useState,useEffect } from "react";
// import { Switch, Popconfirm } from "antd";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";


// function MaterialFastMovingToggle(props) {


//   return (
//     <div>
//       <Popconfirm
//         title="Are you sure you want to change the status?"
//         // onConfirm={() => handleToggleClick()}
//         // onCancel={handleCancel}
//         okText="Yes"
//         cancelText="No"
//       >
//         <Switch
//          className="toggle-clr"
//          //checked={props.featureInd || toggle}
//          isLoading={true}
//           checkedChildren="Yes"
//           unCheckedChildren="No"
//         />
//       </Popconfirm>
//     </div>
//   );
// }

// const mapStateToProps = ({ auth, supplies }) => ({
// //   userId: auth.userDetails.userId,
// //   orgId: auth.userDetails.organizationId,
// //   purchaseList: supplies.purchaseList,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//     //   featureMaterialToggle,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(MaterialFastMovingToggle);

import React, { useState } from "react";
import { Switch, Popconfirm, Input } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function MaterialFastMovingToggle(props) {
  const [isInputVisible, setIsInputVisible] = useState(false); // State to control input visibility

  const handleToggleChange = (checked) => {
    setIsInputVisible(checked); // Show input when the toggle is "Yes"
  };

  return (
    <div>
      <Popconfirm
        title="Are you sure you want to change the status?"
        onConfirm={() => handleToggleChange(true)}
        onCancel={() => handleToggleChange(false)}
        okText="Yes"
        cancelText="No"
      >
        <Switch
          className="toggle-clr"
          checkedChildren="Yes"
          unCheckedChildren="No"
          onChange={handleToggleChange}
        />
      </Popconfirm>

      {/* Conditionally render the input box based on toggle state */}
      {isInputVisible && (
        <Input
          placeholder="Enter details"
          style={{ marginTop: '10px', width: '200px' }}
        />
      )}
    </div>
  );
}

const mapStateToProps = ({ auth, supplies }) => ({
  // Add your state mappings here
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // Add your action creators here
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialFastMovingToggle);


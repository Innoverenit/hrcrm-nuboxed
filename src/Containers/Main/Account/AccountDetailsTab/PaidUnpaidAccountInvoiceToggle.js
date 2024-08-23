import React, { useState,useEffect } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { featureMaterialToggle } from "../Supplies/SuppliesAction";

function PaidUnpaidAccountInvoiceToggle (props) {

  const [toggle, setToggle] = useState(false);

//   function handleToggleClick(item) {
//     if (props.featureInd) {
//       props.featureMaterialToggle({
//         suppliesId: props.suppliesId,
//         featureInd: props.featureInd ? false : true,
         
//       },props.suppliesId);
//       setToggle( props.featureInd ? false : true);
 
//     } else {
//       props.featureMaterialToggle({
//         suppliesId: props.suppliesId,
//         featureInd: props.featureInd ? false : true,
//       },props.suppliesId);
//       setToggle( props.featureInd ? false : true);
//     }
//   }

//   function handleCancel() {
//     if (props.featureInd) {
//       setToggle(true);
//     } else {
//       setToggle(false);
//     }
//   }

  return (
    <div>
      <Popconfirm
        title="Are you sure you want to change the status?"
        // onConfirm={() => handleToggleClick()}
        // onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <Switch
         className="toggle-clr"
         checked={toggle}
         isLoading={true}
          checkedChildren="Paid"
          unCheckedChildren="Unpaid"
        />
      </Popconfirm>
    </div>
  );
}

const mapStateToProps = ({ auth, supplies }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   featureMaterialToggle,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PaidUnpaidAccountInvoiceToggle);

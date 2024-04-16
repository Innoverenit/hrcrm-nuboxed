import React from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {addingLocationToggle } from "./LocationAction";


function BillingToggle(props) {
  
  const [toggle, setToggle] = React.useState(props.billingInd);
  console.log(props.billingInd)

  function handleRefurbishClick(item) {
    if (props.billingInd) {
      props.addingLocationToggle({
        locationId: props.locationDetailsId,
        value: props.billingInd ? false : true,
        type: "billing"
         
      },props.orgId);
 
    } else {
      props.addingLocationToggle({
        locationId: props.locationDetailsId,
        value: props.billingInd ? false : true,
        type: "billing",
      },props.orgId);
    }
  }

  function handleCancel() {
    if (props.billingInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleRefurbishClick()}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
            checked={props.billingInd || toggle}
            isLoading={true}
            style={{
              width: "4em",
              // backgroundColor: props.billingInd || toggle ? "rgb(119, 221, 119)" : "#E6E6E6",
            }}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      
    </>
  );
}


const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  repairInd: auth.userDetails.repairInd,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addingLocationToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingToggle);

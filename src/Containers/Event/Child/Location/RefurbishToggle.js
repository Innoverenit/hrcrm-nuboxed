import React from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {addingLocationToggle } from "./LocationAction";


function RefurbishToggle(props) {
  
  const [toggle, setToggle] = React.useState(props.refurbishInd);
  console.log(props.refurbishInd)

  function handleRefurbishClick(item) {
    if (props.refurbishInd) {
      props.addingLocationToggle({
        locationId: props.locationDetailsId,
        value: props.refurbishInd ? false : true,
        type: "refurbish"
         
      },props.orgId);
 
    } else {
      props.addingLocationToggle({
        locationId: props.locationDetailsId,
        value: props.refurbishInd ? false : true,
        type: "refurbish",
      },props.orgId);
    }
  }

  function handleCancel() {
    if (props.refurbishInd) {
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
            checked={props.refurbishInd || toggle}
            disabled={!props.repairInd}
            isLoading={true}
            style={{
              width: "4em",
              // backgroundColor: props.refurbishInd || toggle ? "rgb(119, 221, 119)" : "#E6E6E6",
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
)(RefurbishToggle);




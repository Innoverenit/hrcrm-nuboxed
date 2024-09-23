import React from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {addingLocationToggle } from "./LocationAction";


function InventoryToggle(props) {
  
  const [toggle, setToggle] = React.useState(props.inventoryInd);
  console.log(props.inventoryInd)

  function handleRefurbishClick(item) {
    if (props.inventoryInd) {
      props.addingLocationToggle({
        locationId: props.locationDetailsId,
        value: props.inventoryInd ? false : true,
        type: "inventory"
         
      },props.orgId);
 
    } else {
      props.addingLocationToggle({
        locationId: props.locationDetailsId,
        value: props.inventoryInd ? false : true,
        type: "inventory",
      },props.orgId);
    }
  }

  function handleCancel() {
    if (props.inventoryInd) {
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
            checked={props.inventoryInd || toggle}
            isLoading={true}
            style={{
              width: "4rem",
              // backgroundColor: props.inventoryInd || toggle ? "rgb(119, 221, 119)" : "#E6E6E6",
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
)(InventoryToggle);

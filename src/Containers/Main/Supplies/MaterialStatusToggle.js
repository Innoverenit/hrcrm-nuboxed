import React, { useEffect,useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkMaterialToggle } from "../Supplies/SuppliesAction";

function MaterialStatusToggle(props) {
  const [assignedIndicator, setAssignedIndicator] = React.useState(false);
  const [toggle, setToggle] = React.useState(props.uniqueIdInd);
console.log("suppliesId",props.suppliesId)
  function handleToggleClick(value) {
    // setAssignedIndicator(!assignedIndicator);
    setToggle(value)
    props.linkMaterialToggle(props.suppliesId,value)
  }


  return (
    <>
      <div>
     
          <Switch
            checked={ toggle}
            isLoading={true}
             onChange={handleToggleClick}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
  
      </div>
    </>
  );
}

const mapStateToProps = ({ auth, supplies }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  purchaseList: supplies.purchaseList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        linkMaterialToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialStatusToggle);
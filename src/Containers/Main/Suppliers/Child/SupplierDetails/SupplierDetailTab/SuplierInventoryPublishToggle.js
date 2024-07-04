import React, { useEffect,useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkSuplierInventoryToggle } from "../../../SuppliersAction";

function SuplierInventoryPublishToggle(props) {
  const[data,setData]=useState(props.inventoryList)
  useEffect(()=>{
    setData(props.inventoryList)
  },[props.inventoryList])
  const [toggle, setToggle] = React.useState(props.publishInventoryInd);
  console.log(props.publishInventoryInd)

  function handleToggleCollection(item) {
    if (props.publishInventoryInd) {
      props.linkSuplierInventoryToggle({
        inventorySupplieId: props.inventorySupplieId,
        publishInventoryInd: props.publishInventoryInd ? false : true,
         
      },props.inventorySupplieId);
      setToggle( props.publishInventoryInd ? false : true);
 
    } else {
      props.linkSuplierInventoryToggle({
        inventorySupplieId: props.inventorySupplieId,
        publishInventoryInd: props.publishInventoryInd ? false : true,
      },props.inventorySupplieId);
      setToggle( props.publishInventoryInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.publishInventoryInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleToggleCollection()}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
            checked={props.publishInventoryInd || toggle}
            // disabled={props.status}
            isLoading={true}
         
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth, suppliers }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  inventoryList: suppliers.inventoryList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkSuplierInventoryToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuplierInventoryPublishToggle);
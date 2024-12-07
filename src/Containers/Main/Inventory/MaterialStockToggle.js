import React, { useState,useEffect } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkMaterialStockToggle } from "../Inventory/InventoryAction";

function MaterialStockToggle(props) {

  const[data,setData]=useState(props.materialUnitsData)
  useEffect(()=>{
    setData(props.materialUnitsData)
  },[props.materialUnitsData])
  const [toggle, setToggle] = useState(props.publishInd);

  function handleToggleClick(item) {
    if (props.publishInd) {
      props.linkMaterialStockToggle({
        suppliesId: props.suppliesId,
        publishInd: props.publishInd ? false : true,
         
      },props.suppliesId);
      setToggle( props.publishInd ? false : true);
 
    } else {
      props.linkMaterialStockToggle({
        suppliesId: props.suppliesId,
        publishInd: props.publishInd ? false : true,
      },props.suppliesId);
      setToggle( props.publishInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.publishInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  return (
    <div>
      <Popconfirm
        title="Are you sure you want to change the status?"
        onConfirm={() => handleToggleClick()}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <Switch
         className="toggle-clr"
         checked={props.publishInd || toggle}
         isLoading={true}
          checkedChildren="Publish"
          unCheckedChildren="Unpublish"
        />
      </Popconfirm>
    </div>
  );
}

const mapStateToProps = ({ auth, inventory }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  materialUnitsData: inventory.materialUnitsData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkMaterialStockToggle,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialStockToggle);

import React, { useState,useEffect } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkMaterialToggle } from "../Supplies/SuppliesAction";

function AddPackToggle(props) {

  const[data,setData]=useState(props.packData)
  useEffect(()=>{
    setData(props.packData)
  },[props.packData])
  const [toggle, setToggle] = useState(props.publishInd);

  function handleToggleClick(item) {
    if (props.publishInd) {
      props.linkMaterialToggle({
        suppliesId: props.suppliesId,
        publishInd: props.publishInd ? false : true,
         
      },props.suppliesId);
      setToggle( props.publishInd ? false : true);
 
    } else {
      props.linkMaterialToggle({
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
          checkedChildren="Packed"
          unCheckedChildren="UnPacked"
        />
      </Popconfirm>
    </div>
  );
}

const mapStateToProps = ({ auth, inventory }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  packData: inventory.packData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkMaterialToggle,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddPackToggle);

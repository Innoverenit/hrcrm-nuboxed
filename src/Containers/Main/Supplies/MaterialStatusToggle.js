import React, { useEffect,useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkMaterialToggle } from "../Supplies/SuppliesAction";

function MaterialStatusToggle(props) {
  const[data,setData]=useState(props.purchaseList)
  useEffect(()=>{
    setData(props.purchaseList)
  },[props.purchaseList])
  const [toggle, setToggle] = React.useState(props.ind);
  console.log(props.ind)

  function handleToggleCollection(item) {
    if (props.ind) {
      props.linkMaterialToggle({
        suppliesId: props.suppliesId,
        ind: props.ind ? false : true,
         
      },props.suppliesId);
      setToggle( props.ind ? false : true);
 
    } else {
      props.linkMaterialToggle({
        suppliesId: props.suppliesId,
        ind: props.ind ? false : true,
      },props.suppliesId);
      setToggle( props.ind ? false : true);
    }
  }

  function handleCancel() {
    if (props.ind) {
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
            checked={props.ind || toggle}
            // disabled={props.status}
            isLoading={true}
            style={{
              width: "5em",
              backgroundColor: props.ind || toggle ? "rgb(119, 221, 119)" : "#E6E6E6",
            }}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      
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
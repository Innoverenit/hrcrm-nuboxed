import React, { useEffect,useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkSuplierToggle } from "../SuppliersAction";

function SuplierPublishToggle(props) {
  const[data,setData]=useState(props.supplierList)
  useEffect(()=>{
    setData(props.supplierList)
  },[props.supplierList])
  const [toggle, setToggle] = React.useState(props.publishInd);
  console.log(props.publishInd)

  function handleToggleCollection(item) {
    if (props.publishInd) {
      props.linkSuplierToggle({
        supplierId: props.supplierId,
        publishInd: props.publishInd ? false : true,
         
      },props.supplierId);
      setToggle( props.publishInd ? false : true);
 
    } else {
      props.linkSuplierToggle({
        supplierId: props.supplierId,
        publishInd: props.publishInd ? false : true,
      },props.supplierId);
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
            checked={props.publishInd || toggle}
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
  supplierList: suppliers.supplierList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkSuplierToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuplierPublishToggle);
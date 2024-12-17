import React, { useEffect,useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkRefurbishToggle } from "./RefurbishAction";

function RefurbishToggle(props) {
  const[data,setData]=useState(props.QAorderList)
  useEffect(()=>{
    setData(props.QAorderList)
  },[props.QAorderList])
  const [toggle, setToggle] = React.useState(props.newDispatchInd);
  console.log(props.newDispatchInd)

  function handleToggleCollection(item) {
    if (props.newDispatchInd) {
      props.linkRefurbishToggle({
        //supplierId: props.supplierId,
        newDispatchInd: props.newDispatchInd ? false : true,
         
      },props.orderPhoneId);
      setToggle( props.newDispatchInd ? false : true);
 
    } else {
      props.linkRefurbishToggle({
        //supplierId: props.supplierId,
        newDispatchInd: props.newDispatchInd ? false : true,
      },props.orderPhoneId);
      setToggle( props.newDispatchInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.newDispatchInd) {
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
            checked={props.newDispatchInd || toggle}
            disabled={props.item.showNewDispatchInd === false || props.item.dispatchInspectionInd === 0 || props.item.dispatchInspectionInd === 3 }
            isLoading={true}
         
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth,refurbish }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  QAorderList: refurbish.QAorderList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkRefurbishToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RefurbishToggle);
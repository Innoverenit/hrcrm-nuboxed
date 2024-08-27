
import React, { useEffect,useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkComplementryToggle } from "./SuppliesAction";

function ComplementaryToggle(props) {
  const[data,setData]=useState(props.purchaseList)
  useEffect(()=>{
    setData(props.purchaseList)
  },[props.purchaseList])
  const [toggle, setToggle] = React.useState(props.complementaryInd);
  console.log(props.complementaryInd)

  function handleToggleCollection(item) {
    if (props.complementaryInd) {
      props.linkComplementryToggle({
        suppliesId: props.suppliesId,
        complementaryItem: props.complementaryItem,
        complementaryInd: props.complementaryInd ? false : true,
         
      });
      setToggle( props.complementaryInd ? false : true);
 
    } else {
      props.linkComplementryToggle({
        suppliesId: props.suppliesId,
        complementaryItem: props.complementaryItem,
         complementaryInd: props.complementaryInd ? false : true,
      });
      setToggle( props.complementaryInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.complementaryInd) {
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
            checked={props.complementaryInd || toggle}
            // disabled={props.status}
            isLoading={true}       
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
      linkComplementryToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComplementaryToggle);


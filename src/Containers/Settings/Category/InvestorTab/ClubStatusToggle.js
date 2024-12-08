import React, { useState,useEffect } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {linkClubToggle} from "../../SettingsAction";
//import { linkMaterialToggle } from "../Supplies/SuppliesAction";

function ClubStatusToggle(props) {

//   const[data,setData]=useState(props.purchaseList)
//   useEffect(()=>{
//     setData(props.purchaseList)
//   },[props.purchaseList])
  const [toggle, setToggle] = useState(props.invToCusInd);

  function handleToggleClick(item) {
    if (props.invToCusInd) {
      props.linkClubToggle({
        //suppliesId: props.suppliesId,
        invToCusInd: props.invToCusInd ? false : true,
         
      },props.clubId);
      setToggle( props.invToCusInd ? false : true);
 
    } else {
      props.linkClubToggle({
        //suppliesId: props.suppliesId,
        invToCusInd: props.invToCusInd ? false : true,
      },props.clubId);
      setToggle( props.invToCusInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.invToCusInd) {
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
         checked={props.invToCusInd || toggle}
         isLoading={true}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      </Popconfirm>
    </div>
  );
}

const mapStateToProps = ({ auth, supplies }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
//   purchaseList: supplies.purchaseList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        linkClubToggle,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ClubStatusToggle);

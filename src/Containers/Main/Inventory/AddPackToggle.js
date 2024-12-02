import React, { useState,useEffect } from "react";
import { Switch, Popconfirm,message } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { base_url2 } from "../../../Config/Auth";
import {setPackedUnpacked} from "./InventoryAction";

function AddPackToggle(props) {

  const [toggle, setToggle] = React.useState(props.item.packingInd);
//  const [reducerData,setreducerData]= useState(props.packData);

  // const sendPutRequest = async (item) => {
  //   try {
  //     const response = await axios.post(
  //       `${base_url2}/dispatchPacking/dispatch-packing`,
  //       item,
  //       {
  //         headers: {
  //           Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
  //         },
  //       }
  //     );
  //     // dispatch(getPackNo(response.data));
  //     setreducerData(prevData => 
  //   prevData.map(cat =>
  //     cat.dispatchPackingId === item.dispatchPackingId ? response.data : cat
  //   )
  // );
  //   } catch (error) {
  //     console.error("Error updating item:", error);
  //   }
  // };


  function handleToggleClick() {
    if (props.item.packingInd) {
      props.setPackedUnpacked({
        orderId: props.item.orderId,
        packingInd: props.item.packingInd ? false : true,
        userId:props.userId,
        packingNo:props.item.packingNo
      },props.item.orderId);
      setToggle( props.item.packingInd ? false : true);
 
    } else {
      props.setPackedUnpacked({
        orderId: props.item.orderId,
        packingInd: props.item.packingInd ? false : true,
        userId:props.userId,
        packingNo:props.item.packingNo
      },props.item.orderId);
      setToggle( props.item.packingInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.item.packingInd) {
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
         checked={toggle || props.item.packingInd}
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setPackedUnpacked
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddPackToggle);

import React, { useState,useEffect } from "react";
import { Switch, Popconfirm,message } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { base_url2 } from "../../../Config/Auth";

function AddPackToggle(props) {

  const[data,setData]=useState(props.packData)
  useEffect(()=>{
    setData(props.packData)
  },[props.packData])

  const sendPutRequest = async (item) => {
    try {
      const response = await axios.post(
        `${base_url2}/dispatchPacking/dispatch-packing`,
        item,
        {
          headers: {
            Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
        }
      );
      // dispatch(getPackNo(response.data));
      if (response.data === 'Successfully !!!!') {
        message.success('Update successful');
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const [toggle, setToggle] = useState(props.packingInd);

  function handleToggleClick(item) {
    if (props.packingInd) {
      sendPutRequest({
        orderId: props.orderId,
        packingInd: props.packingInd ? false : true,
         
      },props.orderId);
      setToggle( props.packingInd ? false : true);
 
    } else {
      sendPutRequest({
        orderId: props.orderId,
        packingInd: props.packingInd ? false : true,
      },props.orderId);
      setToggle( props.packingInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.packingInd) {
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
         checked={props.packingInd || toggle}
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
     
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddPackToggle);

import React, { useState,useEffect } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { materialPricetype } from "../Supplies/SuppliesAction";

function MaterialPriceTypeToggle(props) {


  const [toggle, setToggle] = useState(false);

  function handleToggleClick(item) {
    if (props.recomendInd) {
      props.materialPricetype({
        suppliesId: props.suppliesId,
        recomendInd: props.recomendInd ? false : true,
         
      },props.suppliesId);
      setToggle( props.recomendInd ? false : true);
 
    } else {
      props.materialPricetype({
        suppliesId: props.suppliesId,
        recomendInd: props.recomendInd ? false : true,
      },props.suppliesId);
      setToggle( props.recomendInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.recomendInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  return (
    <div>
      <Popconfirm
        title="Are you sure you want to Recommend ?"
        onConfirm={() => handleToggleClick()}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <Switch
         className="toggle-clr"
         checked={props.recomendInd || toggle}
         isLoading={true}
          checkedChildren="Base price"
          unCheckedChildren="MRP"
        />
      </Popconfirm>
    </div>
  );
}

const mapStateToProps = ({ auth, supplies }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      materialPricetype,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialPriceTypeToggle);
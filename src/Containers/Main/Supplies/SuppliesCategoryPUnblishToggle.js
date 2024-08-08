import React, { useState,useEffect } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { suppliesPUnpblishToggle } from "../Supplies/SuppliesAction";


function SuppliesCategoryPUnblishToggle(props) {

  const [toggle, setToggle] = useState(props.publishInd);

  function handleToggleClick(item) {
    if (props.publishInd) {
      props.suppliesPUnpblishToggle({
        categoryId: props.categoryId,
        publishInd: props.publishInd ? false : true,
         
      },props.categoryId);
      setToggle( props.publishInd ? false : true);
 
    } else {
      props.suppliesPUnpblishToggle({
        categoryId: props.categoryId,
        publishInd: props.publishInd ? false : true,
      },props.categoryId);
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

const mapStateToProps = ({ auth, supplies }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  purchaseList: supplies.purchaseList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      suppliesPUnpblishToggle,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliesCategoryPUnblishToggle);

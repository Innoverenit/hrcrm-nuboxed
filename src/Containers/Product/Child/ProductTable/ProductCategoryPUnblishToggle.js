import React, { useState,useEffect } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { productPUnpblishToggle } from "../../ProductAction";

function ProductCategoryPUnblishToggle(props) {

  const [toggle, setToggle] = useState(props.publishInd);

  function handleToggleClick(item) {
    if (props.publishInd) {
      props.productPUnpblishToggle({
        categoryId: props.categoryId,
        publishInd: props.publishInd ? false : true,
         
      },props.categoryId);
      setToggle( props.publishInd ? false : true);
 
    } else {
      props.productPUnpblishToggle({
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
  products: supplies.products,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      productPUnpblishToggle,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryPUnblishToggle);

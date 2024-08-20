import React, { useState,useEffect } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { OnOffwarrentyProduct } from "../../ProductAction";

function WarrentyProductToggle(props) {

  const[data,setData]=useState(props.products)
  useEffect(()=>{
    setData(props.products)
  },[props.products])
  const [toggle, setToggle] = useState(props.warrantyInd);

  function handleToggleClick(item) {
    if (props.warrantyInd) {
      props.OnOffwarrentyProduct({
        productId: props.productId,
        warrantyInd: props.warrantyInd ? false : true,
         
      },props.productId);
      setToggle( props.warrantyInd ? false : true);
 
    } else {
      props.OnOffwarrentyProduct({
        productId: props.productId,
        warrantyInd: props.warrantyInd ? false : true,
      },props.productId);
      setToggle( props.warrantyInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.warrantyInd) {
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
         checked={props.warrantyInd || toggle}
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
  products: supplies.products,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      OnOffwarrentyProduct,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(WarrentyProductToggle);

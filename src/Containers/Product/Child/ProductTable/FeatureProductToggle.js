import React, { useState,useEffect } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { featureProductToggle } from "../../ProductAction";

function FeatureProductToggle(props) {

  const[data,setData]=useState(props.products)
  useEffect(()=>{
    setData(props.products)
  },[props.products])
  const [toggle, setToggle] = useState(props.featureInd);

  function handleToggleClick(item) {
    if (props.featureInd) {
      props.featureProductToggle({
        suppliesId: props.suppliesId,
        featureInd: props.featureInd ? false : true,
         
      },props.suppliesId);
      setToggle( props.featureInd ? false : true);
 
    } else {
      props.featureProductToggle({
        suppliesId: props.suppliesId,
        featureInd: props.featureInd ? false : true,
      },props.suppliesId);
      setToggle( props.featureInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.featureInd) {
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
         checked={props.featureInd || toggle}
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
      featureProductToggle,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FeatureProductToggle);

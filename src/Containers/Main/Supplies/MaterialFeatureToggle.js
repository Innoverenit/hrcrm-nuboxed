import React, { useState,useEffect } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { featureMaterialToggle } from "../Supplies/SuppliesAction";

function MaterialFeatureToggle(props) {

  const[data,setData]=useState(props.purchaseList)
  useEffect(()=>{
    setData(props.purchaseList)
  },[props.purchaseList])
  const [toggle, setToggle] = useState(props.featureInd);

  function handleToggleClick(item) {
    if (props.featureInd) {
      props.featureMaterialToggle({
        suppliesId: props.suppliesId,
        featureInd: props.featureInd ? false : true,
         
      },props.suppliesId);
      setToggle( props.featureInd ? false : true);
 
    } else {
      props.featureMaterialToggle({
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
  purchaseList: supplies.purchaseList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      featureMaterialToggle,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MaterialFeatureToggle);

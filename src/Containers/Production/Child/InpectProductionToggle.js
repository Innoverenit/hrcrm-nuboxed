
import React, { useState } from "react";
import { Switch,Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setInspectProdn } from "../ProductionAction";
import dayjs from "dayjs";

function InpectProductionToggle(props) {

  const [toggle, setToggle] = useState(props.item.inspectedInd);

  function handleToggleCollection(item) {
    if (props.item.inspectedInd) {
      const currentDate = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      props.setInspectProdn(
        {
          manufactureId: props.item.manufactureId,
          inspectedDate : currentDate,
          locationDetailsId: props.locationId,
          inspectedUserId:props.userId,
            inspectedInd: props.item.inspectedInd ? false : true,
          },
     
        );
        setToggle( props.item.inspectedInd ? false : true);
    } else {
      const currentDate = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        props.setInspectProdn(
            {
              manufactureId: props.item.manufactureId,
          inspectedDate : currentDate,
          locationDetailsId: props.locationId,
          inspectedUserId:props.userId,
              inspectedInd: props.item.inspectedInd ? false : true,
            },
           
        );
        setToggle( props.item.inspectedInd ? false : true);
    }
}

function handleCancel() {
    if (props.item.inspectedInd) {
        setToggle(true);
    } else {
        setToggle(false);
    }
}


  return (
    <div>
      <Popconfirm
                  title="Confirm status change?"
                  onConfirm={() => handleToggleCollection()}
                  onCancel={handleCancel}
                  okText="Ok"
                  cancelText="Cancel"
              >
                  <Switch
                      checked={toggle || props.item.inspectedInd}
                      isLoading={true}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                  />
              </Popconfirm>
      
    </div>
  );

}

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  locationId: auth.userDetails.locationId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setInspectProdn
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(InpectProductionToggle);

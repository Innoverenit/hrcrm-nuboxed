import React, { useEffect,useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkMasterCurrencyToggle } from "../KpiMasterList/KpiMasterListAction";

function PerformaneCurrencyToggle(props) {
  const[data,setData]=useState(props.masterKpiList)
  useEffect(()=>{
    setData(props.masterKpiList)
  },[props.masterKpiList])
  const [toggle, setToggle] = React.useState(props.currencyInd);
  console.log(props.currencyInd)

  function handleToggleCollection(item) {
    if (props.currencyInd) {
      props.linkMasterCurrencyToggle({
        performanceManagementId: props.performanceManagementId,
        currencyInd: props.currencyInd ? false : true,
         
      },props.performanceManagementId);
      setToggle( props.currencyInd ? false : true);
 
    } else {
      props.linkMasterCurrencyToggle({
        performanceManagementId: props.performanceManagementId,
        currencyInd: props.currencyInd ? false : true,
      },props.performanceManagementId);
      setToggle( props.currencyInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.currencyInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleToggleCollection()}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
            checked={props.currencyInd || toggle}
            // disabled={props.status}
            isLoading={true}
            style={{
              width: "5em",
              backgroundColor: props.currencyInd || toggle ? "rgb(119, 221, 119)" : "#E6E6E6",
            }}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth, masterKpi }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  masterKpiList:masterKpi.masterKpiList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        linkMasterCurrencyToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PerformaneCurrencyToggle);
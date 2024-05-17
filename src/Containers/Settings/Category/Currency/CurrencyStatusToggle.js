import React, { useEffect,useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkCurrencyToggle } from "../Currency/CurrencyAction";

function CurrencyStatusToggle(props) {
  const[data,setData]=useState(props.currencyList)
  useEffect(()=>{
    setData(props.currencyList)
  },[props.currencyList])
  const [toggle, setToggle] = React.useState(props.mandatoryInd);
  console.log(props.mandatoryInd)

  function handleToggleCollection(item) {
    if (props.mandatoryInd) {
      props.linkCurrencyToggle({
        currency_id: props.currency_id,
        mandatoryInd: props.mandatoryInd ? false : true,
         
      },props.currency_id);
      setToggle( props.mandatoryInd ? false : true);
 
    } else {
      props.linkCurrencyToggle({
        currency_id: props.currency_id,
        mandatoryInd: props.mandatoryInd ? false : true,
      },props.currency_id);
      setToggle( props.mandatoryInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.mandatoryInd) {
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
            checked={props.mandatoryInd || toggle}
            // disabled={props.status}
            isLoading={true}
            style={{
              width: "5em",
              backgroundColor: props.mandatoryInd || toggle ? "rgb(119, 221, 119)" : "#E6E6E6",
            }}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth, currency }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  currencyList:currency.currencyList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkCurrencyToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyStatusToggle);
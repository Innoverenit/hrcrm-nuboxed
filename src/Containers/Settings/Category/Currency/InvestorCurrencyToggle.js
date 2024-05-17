import React, { useEffect,useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkInvestorCurrencyToggle } from "../Currency/CurrencyAction";

function InvestorCurrencyToggle(props) {
  const[data,setData]=useState(props.currencyList)
  useEffect(()=>{
    setData(props.currencyList)
  },[props.currencyList])
  const [toggle, setToggle] = React.useState(props.investorInd);
  console.log(props.investorInd)

  function handleToggleCollection(item) {
    if (props.investorInd) {
      props.linkInvestorCurrencyToggle({
        currency_id: props.currency_id,
        investorInd: props.investorInd ? false : true,
         
      },props.currency_id);
      setToggle( props.investorInd ? false : true);
 
    } else {
      props.linkInvestorCurrencyToggle({
        currency_id: props.currency_id,
        investorInd: props.investorInd ? false : true,
      },props.currency_id);
      setToggle( props.investorInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.investorInd) {
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
            checked={props.investorInd || toggle}
            // disabled={props.status}
            isLoading={true}
            style={{
              width: "5em",
              backgroundColor: props.investorInd || toggle ? "rgb(119, 221, 119)" : "#E6E6E6",
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
        linkInvestorCurrencyToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvestorCurrencyToggle);
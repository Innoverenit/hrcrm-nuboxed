import React, { useEffect,useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkSalesCurrencyToggle } from "../Currency/CurrencyAction";

function SalesCurrencyToggle(props) {
  const[data,setData]=useState(props.currencyList)
  useEffect(()=>{
    setData(props.currencyList)
  },[props.currencyList])
  const [toggle, setToggle] = React.useState(props.salesInd);
  console.log(props.salesInd)

  function handleToggleCollection(item) {
    if (props.salesInd) {
      props.linkSalesCurrencyToggle({
        currency_id: props.currency_id,
        salesInd: props.salesInd ? false : true,
         
      },props.currency_id);
      setToggle( props.salesInd ? false : true);
 
    } else {
      props.linkSalesCurrencyToggle({
        currency_id: props.currency_id,
        salesInd: props.salesInd ? false : true,
      },props.currency_id);
      setToggle( props.salesInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.salesInd) {
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
            checked={props.salesInd || toggle}
            // disabled={props.status}
            isLoading={true}
            style={{
              width: "9em",
              backgroundColor: props.salesInd || toggle ? "rgb(119, 221, 119)" : "#E6E6E6",
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
        linkSalesCurrencyToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesCurrencyToggle);
import React, { useEffect,useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkCountrySalesToggle } from "../Country/CountryAction";

function CountrySalesToggle(props) {
  const[data,setData]=useState(props.country)
  useEffect(()=>{
    setData(props.country)
  },[props.country])
  const [toggle, setToggle] = React.useState(props.salesInd);
  console.log(props.salesInd)

  function handleToggleCollection(item) {
    if (props.salesInd) {
      props.linkCountrySalesToggle({
        country_id: props.country_id,
        salesInd: props.salesInd ? false : true,
         
      },props.country_id);
      setToggle( props.salesInd ? false : true);
 
    } else {
      props.linkCountrySalesToggle({
        country_id: props.country_id,
        salesInd: props.salesInd ? false : true,
      },props.country_id);
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
            checkedChildren="Required"
            unCheckedChildren="Not Required"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth, countrys }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  country:countrys.country,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkCountrySalesToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountrySalesToggle);











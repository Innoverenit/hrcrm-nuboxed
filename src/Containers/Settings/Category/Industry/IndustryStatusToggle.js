import React, { useEffect,useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkCountryToggle } from "../Country/CountryAction";

function IndustryStatusToggle(props) {
  const[data,setData]=useState(props.country)
  useEffect(()=>{
    setData(props.country)
  },[props.country])
  const [toggle, setToggle] = React.useState(props.mandatoryInd);
  console.log(props.mandatoryInd)

  function handleToggleCollection(item) {
    if (props.mandatoryInd) {
      props.linkCountryToggle({
        country_id: props.country_id,
        mandatoryInd: props.mandatoryInd ? false : true,
         
      },props.country_id);
      setToggle( props.mandatoryInd ? false : true);
 
    } else {
      props.linkCountryToggle({
        country_id: props.country_id,
        mandatoryInd: props.mandatoryInd ? false : true,
      },props.country_id);
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
        //   onConfirm={() => handleToggleCollection()}
        //   onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
            // checked={props.mandatoryInd || toggle}
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

const mapStateToProps = ({ auth, countrys }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  country:countrys.country,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        linkCountryToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndustryStatusToggle);
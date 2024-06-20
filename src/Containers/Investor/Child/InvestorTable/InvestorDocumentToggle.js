import React, { useEffect,useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkInvestorToggle } from "../../InvestorAction";

function InvestorDocumentToggle(props) {
  const[data,setData]=useState(props.documentAllList)
  useEffect(()=>{
    setData(props.documentAllList)
  },[props.documentAllList])
  const [toggle, setToggle] = React.useState(props.availableInd);
  console.log(props.availableInd)

  function handleToggleCollection(item) {
    if (props.availableInd) {
      props.linkInvestorToggle({
        investorId: props.RowData.investorId,
        documentTypeId: props.documentTypeId,
        availableInd: props.availableInd ? false : true,
         
      });
      setToggle( props.availableInd ? false : true);
 
    } else {
      props.linkInvestorToggle({
        investorId: props.RowData.investorId,
        documentTypeId: props.documentTypeId,
        availableInd: props.availableInd ? false : true,
      });
      setToggle( props.availableInd ? false : true);
    }
  }

  function handleCancel() {
    if (props.availableInd) {
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
            checked={props.availableInd || toggle}
            // disabled={props.status}
            isLoading={true}
         
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth, investor }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  documentAllList:investor.documentAllList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkInvestorToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvestorDocumentToggle);
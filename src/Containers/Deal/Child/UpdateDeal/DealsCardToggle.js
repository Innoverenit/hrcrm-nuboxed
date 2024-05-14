import React,{useState} from "react";
import { Switch,Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setDealsContactType } from "../../DealAction";

function DealsCardToggle (props) {
  const [toggle, setToggle] = React.useState(props.item.borrowInd)

  console.log("sssp",props.item.borrowInd,toggle)

  function handleToggleCollection(item) {
      if (props.item.borrowInd) {
        props.setDealsContactType(
          {
            //   supplierId:props.item.supplierId,
              invOpportunityId:props.invOpportunityId,
              borrowInd: props.item.borrowInd ? false : true,
            },
       
          );
          setToggle( props.item.borrowInd ? false : true);
      } else {
          props.setDealsContactType(
              {
                // supplierId:props.item.supplierId,
                invOpportunityId:props.invOpportunityId,
                borrowInd: props.item.borrowInd ? false : true,
              },
             
          );
          setToggle( props.item.borrowInd ? false : true);
      }
  }

  function handleCancel() {
      if (props.item.borrowInd) {
          setToggle(true);
      } else {
          setToggle(false);
      }
  }

  return (
      <>
          <div>
              <Popconfirm
                  title="Confirm status change?"
                  onConfirm={() => handleToggleCollection()}
                  onCancel={handleCancel}
                  okText="Ok"
                  cancelText="Cancel"
              >
                  <Switch
                      checked={toggle || props.item.borrowInd}
                      // disabled={props.status}
                      isLoading={true}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                  />
              </Popconfirm>
          </div>
      </>
  );
}
   

const mapStateToProps = ({ auth }) => ({
    userId: auth.userDetails.userId,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            setDealsContactType
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(DealsCardToggle);

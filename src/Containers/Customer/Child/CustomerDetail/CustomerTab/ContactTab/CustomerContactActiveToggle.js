import React, { } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { putCustomerContactToggle } from "../../../../CustomerAction";

function CustomerContactActiveToggle(props) {

    const [toggle, setToggle] = React.useState(props.accessInd)

    function handleToggleCollection(item) {
         let type="Prospect Contact To User"
        console.log("toggle",props.thirdPartyAccessInd)
        // setPaymentCollection(!paymentCollection);
       
           
            props.putCustomerContactToggle(
               
                props.contactId,
                props.userId,
                type
               
                // props.mrchantDetailsId,
            );
       
              
              
             
        
    }

    function handleCancel() {
        if (props.accessInd) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }
    return (
        <> 
        {/* {props.thirdPartyAccessInd==="false"&& */}
            <div>
                <Popconfirm
                    title="Confirm status change?"
                    onConfirm={() => handleToggleCollection()}
                    onCancel={handleCancel}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    <Switch
                         checked={props.accessInd || toggle}
                        //disabled={props.thirdPartyAccessInd}
                        isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                </Popconfirm>
            </div>
{/* } */}
        </>
    );
}

const mapStateToProps = ({ auth,customer }) => ({
    userId: auth.userDetails.userId,
  puttingCustContcToggle: customer.puttingCustContcToggle,
  puttingCustContcToggleError:customer.puttingCustContcToggleError,

});

const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
      putCustomerContactToggle
  },
  dispatch
);
export default connect(mapStateToProps, mapDispatchToProps)(CustomerContactActiveToggle);

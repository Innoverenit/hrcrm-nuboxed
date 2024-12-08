import React, { } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getCustomerDocument,linkCustomerContract} from "../../../../CustomerAction";

function ContractToggle(props) {

    const [toggle, setToggle] = React.useState(props.contractInd)

    function handleToggleCollection() {     
        props.linkCustomerContract(
            {
               
            },
            props.documentId,
        props.contractInd ? false : true,
        );
      }
    return (
        <>
            <div>
                <Popconfirm
                    title="Confirm status change?"
                    onConfirm={() => handleToggleCollection()}
                    onCancel={null}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    
                    <Switch className="toggle-clr"
                        checked={props.contractInd || toggle}
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

const mapStateToProps = ({ customer  }) => ({
    documentsByCustomerId: customer.documentsByCustomerId,
    customerId: customer.customer.customerId,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getCustomerDocument,
            linkCustomerContract,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ContractToggle);

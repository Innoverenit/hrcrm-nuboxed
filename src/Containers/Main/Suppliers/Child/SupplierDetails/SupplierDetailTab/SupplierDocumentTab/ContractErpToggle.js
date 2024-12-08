import React, { useEffect, useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getSupplierDocument,linkSupplierDoc} from "../../../../SuppliersAction";

function ContractErpToggle(props) {

    const [toggle, setToggle] = React.useState(props.contractInd)

    // useEffect(() => {
    //     setToggle(props.documentsBySupplierId);
    //   }, [props.documentsBySupplierId]);

    function handleToggleCollection() {     
        props.linkSupplierDoc(
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

const mapStateToProps = ({ customer ,suppliers }) => ({
    documentsBySupplierId: suppliers.documentsBySupplierId,
    customerId: customer.customer.customerId,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSupplierDocument,
            linkSupplierDoc,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ContractErpToggle);

import React, { useEffect, useState } from "react";
import { Switch, Checkbox, Popconfirm} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    linkSupplierApproval,
} from "../SuppliersAction";

function SuplierNotApprovalPublish(props) {
    const [data, setData] = useState(props.supplierList);
  useEffect(() => {
    setData(props.supplierList);
  }, [props.supplierList]);

    function handleDispatchToggle() {
        props.linkSupplierApproval(
        //   {     
        //     dispatchInd: true,
        //     userId:props.item.userId,
           
        //   },
          props.supplierId,
          false
        );
      }
    return (
        <>
            <div>
                <Popconfirm
                    title="Confirm status change?"
                    onConfirm={handleDispatchToggle}
                    onCancel={null}
                    okText="Ok"
                    cancelText="Cancel"
                >
                    <Switch className="toggle-clr"
            //  checked={props.approvedInd}
                        // isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                </Popconfirm>
            </div>
        </>
    );
}

const mapStateToProps = ({ auth, suppliers }) => ({
    userId: auth.userDetails.userId,
    supplierList: suppliers.supplierList, 
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            linkSupplierApproval,         
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SuplierNotApprovalPublish);

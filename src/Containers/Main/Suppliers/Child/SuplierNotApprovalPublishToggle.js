import React, { useEffect, useState } from "react";
import { Switch, Checkbox, Popconfirm} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    linkSupplierNotApproval,
    // getPartnerListByUserId
} from "../SuppliersAction";

function SuplierNotApprovalPublishToggle(props) {
    //const [toggle, setToggle] = React.useState(props.item.completeInd)
    const [data, setData] = useState(props.notApprovalSupplierList);
    useEffect(() => {
      setData(props.notApprovalSupplierList);
    }, [props.notApprovalSupplierList]);
    function handleDispatchToggle() {
        props.linkSupplierNotApproval(
        //   {     
        //     dispatchInd: true,
        //     userId:props.item.userId,
           
        //   },
          props.supplierId,
          true
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
            checked={props.approvedInd}
                        // isLoading={true}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                </Popconfirm>
            </div>
        </>
    );
}

const mapStateToProps = ({ auth, partner,suppliers }) => ({
    userId: auth.userDetails.userId,
    updatePartnerById: partner.updatePartnerById,
    updatePartnerByIdError: partner.updatePartnerByIdError,
    notApprovalSupplierList:suppliers.notApprovalSupplierList,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            linkSupplierNotApproval,
            // getPartnerListByUserId,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SuplierNotApprovalPublishToggle);

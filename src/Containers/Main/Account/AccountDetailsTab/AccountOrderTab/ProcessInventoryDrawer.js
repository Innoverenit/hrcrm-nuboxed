import React, { lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Modal } from "antd";
import { BundleLoader } from "../../../../../Components/Placeholder";


const RepairSpareListTable  = lazy(() => import("../../../Refurbish/RepairSpareListTable"));

const ProcessInventoryDrawer = (props) => {
    const { RowData, ...formProps } = props;
    console.log(props.newData)
    return (
        <>
            <Modal
               // title={props.newData.imei}
                width="60%"
                visible={props.processSpareModal}
                closable
                destroyOnClose
                footer={null}
                  placement="right"
                  onCancel={() => props.handleSpareProcess(false)}
            >
                <Suspense fallback={<BundleLoader />}>
                <RepairSpareListTable
                            // phoneId={props.phoneId}
                            // RowData={props.RowData}
                           // orderPhoneId={props.orderPhoneId}  
                            phoneTaskId={props.newData && props.newData.phoneTaskId}                               
                        />
                </Suspense>
            </Modal>
        </>
    );


}
const mapStateToProps = ({ }) => ({


});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProcessInventoryDrawer);


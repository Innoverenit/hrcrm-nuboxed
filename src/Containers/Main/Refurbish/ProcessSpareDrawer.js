import React, { lazy, Suspense, useEffect } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Modal } from "antd";
import AddSpareInRepair from "./AddSpareInRepair";


const ProcessSpareDrawer = (props) => {
    const { RowData, ...formProps } = props;
    return (
        <>
            <Modal
                title={props.RowData.imei}
                width="60%"
                visible={props.processSpareModal}
                closable
                destroyOnClose
                footer={null}
                  placement="right"
                  onCancel={() => props.handleSpareProcess(false)}
            >
                <Suspense fallback={<BundleLoader />}>
                <AddSpareInRepair
                        phoneId={props.phoneId}
                        RowData={RowData}
                        orderPhoneId={props.rowData.orderPhoneId}
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
)(ProcessSpareDrawer);


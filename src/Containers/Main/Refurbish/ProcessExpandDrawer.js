import React, { lazy, Suspense, useEffect } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RepairTaskList from "./RepairTaskList";
import { Modal } from "antd";


const ProcessExpandDrawer = (props) => {
    const { RowData, ...formProps } = props;
    return (
        <>
            <Modal
                title={RowData.imei}
                width="60%"
                visible={props.processExpandModal}
                closable
                destroyOnClose
                footer={null}
                  placement="right"
                  onCancel={() => props.handleProcessExpand(false)}
            >
                <Suspense fallback={<BundleLoader />}>
                <RepairTaskList
                        phoneId={RowData.phoneId}
                        RowData={RowData}
                        rowData={props.rowData}
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
)(ProcessExpandDrawer);


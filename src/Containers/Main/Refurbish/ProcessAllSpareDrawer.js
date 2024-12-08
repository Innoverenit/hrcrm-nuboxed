import React, { lazy, Suspense, useEffect } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Modal } from "antd";
import RepairSpareListTable from "./RepairSpareListTable";



const ProcessAllSpareDrawer = (props) => {
    const { RowData, ...formProps } = props;
    console.log(props.newData)
    return (
        <>
            <Modal
                title={props.newData.taskName}
                width="60%"
                visible={props.allSpareProcessModal}
                closable
                destroyOnClose
                footer={null}
                  placement="right"
                  onCancel={() => props.handleAllSpareProcess(false)}
            >
                <Suspense fallback={<BundleLoader />}>
                <RepairSpareListTable                      
                            phoneTaskId={ props.newData.phoneTaskId}                               
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
)(ProcessAllSpareDrawer);


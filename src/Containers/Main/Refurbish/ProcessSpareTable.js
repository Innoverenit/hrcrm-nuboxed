import React, { lazy, Suspense, useEffect } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Modal } from "antd";
import AddSpareInRepair from "./AddSpareInRepair";
import RepairSpareListTable from "./RepairSpareListTable";


const ProcessSpareTable = (props) => {
    const { RowData, ...formProps } = props;
    console.log(props.newData)
    return (
        <>
            <Modal
                title={props.RowData.imei}
                width="60%"
                visible={props.open}
                closable
                destroyOnClose
                footer={null}
                  placement="right"
                  onCancel={() => props.setOpen(false)}
            >
                <Suspense fallback={<BundleLoader />}>
                <RepairSpareListTable
                            phoneId={props.phoneId}
                            RowData={props.RowData}
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
)(ProcessSpareTable);


import React, { lazy, Suspense, useEffect } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Modal } from "antd";
import PhoneListOrderTaskTable from "./PhoneListOrderTaskTable";



const ProcessSpareDrawer = (props) => {
    const { RowData, ...formProps } = props;
    console.log(props.newData)
    return (
        <>
            <Modal
                title={props.data.imei}
                width="60%"
                visible={props.allTaskModal}
                closable
                destroyOnClose
                footer={null}
                  placement="right"
                  onCancel={() => props.handleAllTaskModal(false)}
            >
                <Suspense fallback={<BundleLoader />}>
                <PhoneListOrderTaskTable data={props.data}/>
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


import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ErpNote from "../ErpNote/ErpNote";
const QCPhoneNotesOrderForm = lazy(() => import("./QCPhoneNotesOrderForm"));

const QCPhoneNotesOrderModal = (props) => {
    const { RowData, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Notes`}
                visible={props.phoNotesQCOrderModal}
                width="40%"
                onClose={() => props.handleQCPhoneNotesOrderModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                <ErpNote
                         type="phone"
                         id={props.RowData.phoneId}
                        />
                  
                   
                </Suspense>
            </StyledDrawer>
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
)(QCPhoneNotesOrderModal);


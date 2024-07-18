import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ErpNote from "../ErpNote/ErpNote";



const RefurbishNoteAll = (props) => {
    const { RowData, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Notes`}
                visible={props.productioNoteModal}
                width="40%"
                onClose={() => props.handleProductionNotesModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                <ErpNote
                         type="orderPhone"
                         id={props.rowData.orderPhoneId}
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
)(RefurbishNoteAll);


import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const InspectedPhoneByOrder = lazy(() => import("./InspectedPhoneByOrder"));

const ShowProductBuilderModal = (props) => {
    const { RowData, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Order No-${props.rowData.newOrderNo}`}
                width="90%"
                visible={props.productBuilderList}
                maskClosable={false}
                destroyOnClose
                onClose={() => props.handleProductBuilder(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <InspectedPhoneByOrder rowData={props.rowData} />
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
)(ShowProductBuilderModal);


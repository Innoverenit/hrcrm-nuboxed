import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import SpareTabList from "./SpareTabList";



const SpareDrawerOpen = (props) => {
    const { RowData, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Notes`}
                visible={props.spareOpen}
                width="40%"
                onClose={() => props.setSpareOpen(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                <SpareTabList/>
                  
                   
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
)(SpareDrawerOpen);


import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";

const QuotaionEcomStepper=lazy(()=>import("./QuotaionEcomStepper"));

const QuotationDrawer = (props) => {
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "70%";
    return (
        <>
            <StyledDrawer
                title="Add Quotation"
                width={drawerWidth}
                visible={props.quotationItemDrwr}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                onClose={() => props.quatationDrawer(false)}
                placement="right"
            >
                <Suspense fallback={<BundleLoader />}>
               <QuotaionEcomStepper/>
                </Suspense>
            </StyledDrawer>
        </>
    );
};
const mapStateToProps = ({ myorder, auth }) => ({
    employee_type:auth.userDetails.employee_type

});
const mapDispatchToProps = (dispatch) => bindActionCreators({


},dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(QuotationDrawer);

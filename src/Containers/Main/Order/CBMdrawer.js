import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import CBMTable from "./CBMTable";



const CBMdrawer = (props) => {
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "70%";
    return (
        <>
            <StyledDrawer
                title={`Order No - ${props.particularRowData.newOrderNo}`}
                width={drawerWidth}
                visible={props.cbmDrawer}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                onClose={() => props.setcbmDrawer(false)}
                placement="right"
            >
                <Suspense fallback={<BundleLoader />}>
               <CBMTable/>
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
export default connect(mapStateToProps, mapDispatchToProps)(CBMdrawer);

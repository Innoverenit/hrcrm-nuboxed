import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const EcomStatuShower = lazy(() => import("./EcomStatuShower"));

const EcomStatusCardDrawer = (props) => {
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "70%";
    return (
        <>
            <StyledDrawer
                title={`Status: ${props.particularRowData.newOrderNo}`}
                width={drawerWidth}
                visible={props.modalVisible}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                onClose={props.closeModal}
                placement="right"
            >
                <Suspense fallback={<BundleLoader />}>

               <EcomStatuShower   particularRowData={props.particularRowData}
                  translateText={props.translateText}
                  selectedLanguage={props.selectedLanguage}
                translatedMenuItems={props.translatedMenuItems}
               />    

                </Suspense>
            </StyledDrawer>
        </>
    );
};

const mapStateToProps = ({ myorder, auth }) => ({
    employee_type:auth.userDetails.employee_type

});
const mapDispatchToProps = (dispatch) => bindActionCreators({


}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EcomStatusCardDrawer);
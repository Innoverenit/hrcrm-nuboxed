import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const AccountProcureDetails =lazy(()=> import("./AccountProcureDetails"));

const AccountProcureDetailsModal = (props) => {
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "90%";

    console.log("dddph",props.particularRowData)
    return (
        <>
            <StyledDrawer  
                title={`${props.translatedMenuItems[15]} : ${props.particularRowData.newOrderNo}`}
                width={drawerWidth}
                visible={props.addProcureDetailsModal}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                onClose={() => props.handleProcureDetailsModal(false)}
                placement="right"
            >
                <Suspense fallback={<BundleLoader />}>
                
               <AccountProcureDetails  
               particularRowData={props.particularRowData}
               selectedLanguage={props.selectedLanguage}
               translateText={props.translateText}
               translatedMenuItems={props.translatedMenuItems}
               handleProcureDetailsModal={props.handleProcureDetailsModal}

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
export default connect(mapStateToProps, mapDispatchToProps)(AccountProcureDetailsModal);
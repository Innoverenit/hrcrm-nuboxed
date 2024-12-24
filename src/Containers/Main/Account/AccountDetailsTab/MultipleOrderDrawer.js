import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";

const MultipleOrderDrawerCard =lazy(()=> import("./MultipleOrderDrawerCard"));

const MultipleOrderDrawer = (props) => {
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "70%";

    return (
        <>
            <StyledDrawer  
                title={props.translatedMenuItems[10]}
                width={drawerWidth}
                visible={props.modalMultiple}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                onClose={() => props.setmodalMultiple(false)}
                placement="right"
            >
                <Suspense fallback={<BundleLoader/>}>
                
               <MultipleOrderDrawerCard  
               particularRowItem={props.particularRowItem}
               selectedLanguage={props.selectedLanguage}
               translatedMenuItems={props.translatedMenuItems}
               translateText={props.translateText}
               distributorId={props.distributorId}
               modalMultiple={props.modalMultiple}
                setmodalMultiple={props.setmodalMultiple}
               
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
export default connect(mapStateToProps, mapDispatchToProps)(MultipleOrderDrawer);
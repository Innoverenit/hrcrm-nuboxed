import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import ItemListShow from "./ItemListShow";


const itemListListDrawer = (props) => {
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    return (
        <>
            <StyledDrawer  
               title={`Order: ${props.particularRowData.newOrderNo}`}
                width={drawerWidth}
                visible={props.openDrawer}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                onClose={() => props.setOpenDrawer(false)}
                placement="right"
            >
                <Suspense fallback={<BundleLoader />}>
         <ItemListShow
          particularRowData={props.particularRowData}
          selectedLanguage={props.selectedLanguage}
          translateText={props.translateText}
          translatedMenuItems={props.translatedMenuItems}
          distributorData={props.distributorData}
          
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
export default connect(mapStateToProps, mapDispatchToProps)(itemListListDrawer);
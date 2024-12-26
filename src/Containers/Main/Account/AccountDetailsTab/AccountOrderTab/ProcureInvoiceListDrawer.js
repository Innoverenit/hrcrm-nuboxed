import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";

const ProcureInvoiceList =lazy(()=> import("./ProcureInvoiceList"));

const ProcureInvoiceListDrawer = (props) => {
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    return (
        <>
            <StyledDrawer  
                title={`${props.translatedMenuItems[19]} ${props.particularRowData.newOrderNo}`}
                width={drawerWidth}
                visible={props.openInvoiceModal}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                onClose={() => props.setopenInvoiceModal(false)}
                placement="right"
            >
                <Suspense fallback={<BundleLoader />}>
               <ProcureInvoiceList  orderPhoneId={props.particularRowData.orderPhoneId}
               orderId={props.particularRowData.orderId}
               particularRowData={props.particularRowData}
               translatedMenuItems={props.translatedMenuItems}
               distributorId={props.distributorId}
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
export default connect(mapStateToProps, mapDispatchToProps)(ProcureInvoiceListDrawer);
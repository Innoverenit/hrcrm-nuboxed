import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import OrderSupplierItemViewer from "./OrderSupplierItemViewer";
import ProcureItemView from "./ProcureItemView";


const ProcureItemViewDrawer = (props) => {
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "70%";
    return (
        <>
            <StyledDrawer
                title={`Order No - ${props.particularRowData.newOrderNo}`}
                width={drawerWidth}
                visible={props.viewItemDrwr}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                onClose={() => props.handleItemViewDrawer(false)}
                placement="right"
            >
                <Suspense fallback={<BundleLoader />}>
                {props.employee_type==="Supplier" ? 
               <OrderSupplierItemViewer   rowDatas={props.particularRowData}/>
                     :
                    <ProcureItemView
                    rowDatas={props.particularRowData}
                     />}

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
export default connect(mapStateToProps, mapDispatchToProps)(ProcureItemViewDrawer);

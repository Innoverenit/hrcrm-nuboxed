import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const OrderQCandRepairHistory = lazy(() => import("./OrderQCandRepairHistory"));

const TechnicianModal = (props) => {
    const { showTechnicianModal, handleTechnicianModal } = props;
    return (
        <>
            <StyledDrawer
                title="Order History"
                width="60%"
                visible={showTechnicianModal}
                closable 
                destroyOnClose
                onClose={() => handleTechnicianModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <OrderQCandRepairHistory rowData={props.rowData}
                      translateText={props.translateText}
                      selectedLanguage={props.selectedLanguage} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default TechnicianModal;

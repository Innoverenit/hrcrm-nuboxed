import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const AssignCatalogueRepairForm = lazy(() => import("./AssignCatalogueRepairForm"));
const AssignRepairForm = lazy(() => import("./AssignRepairForm"));

const AddAssignRepairModal = (props) => {
    const { showAssignRepairModal, handleAssignRepairModal, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Assign for repair - ${props.rowData.newOrderNo}`}
                width="60%"
                visible={showAssignRepairModal}
                maskClosable={false}
                destroyOnClose
                onClose={() => handleAssignRepairModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    {props.rowData.type === "Catalogue" ?
                        <AssignCatalogueRepairForm rowData={props.rowData} />
                        : <AssignRepairForm rowData={props.rowData} />
                    }
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddAssignRepairModal;

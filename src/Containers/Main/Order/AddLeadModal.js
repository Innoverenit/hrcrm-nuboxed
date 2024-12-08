import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
// import CardContainer from "./CardContainer";
const AddLeadForm = lazy(() => import("./AddLeadForm"));

const AddLeadModal = (props) => {
    const { ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Tag Lead - ${props.particularRowData.newOrderNo}`}
                width="50vw"
                visible={props.addLeadInOrder}
                destroyOnClose
                closable
                onClose={() => props.handleLeadModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <AddLeadForm
                        selectedLanguage={props.selectedLanguage}
                        translateText={props.translateText}
                        particularRowData={props.particularRowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddLeadModal;

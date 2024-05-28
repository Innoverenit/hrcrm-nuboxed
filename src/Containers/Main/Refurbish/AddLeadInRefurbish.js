import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
// import CardContainer from "./CardContainer";
const LeadRefurbishForm = lazy(() => import("./LeadRefurbishForm"));

const AddLeadInRefurbish = (props) => {
    const { ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Tag Lead - ${props.rowData.newOrderNo}`}
                width="50vw"
                visible={props.showRefurbishLead}
                destroyOnClose
                closable
                onClose={() => props.handleRefurbishLead(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <LeadRefurbishForm
                        rowData={props.rowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddLeadInRefurbish;

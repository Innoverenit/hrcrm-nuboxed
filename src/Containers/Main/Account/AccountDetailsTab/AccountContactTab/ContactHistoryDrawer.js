import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";


const ContactHistoryDrawerCard = lazy(() => import("./ContactHistoryDrawerCard"));

const ContactHistoryDrawer = (props) => {

    const { ...formProps } = props;

    return (
        <>
            <StyledDrawer
                title="Contact"
                width="60%"
                visible={props.modalContactHistory}
                maskClosable={false}
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)"}}
                style={{marginTop:"3rem"}}
                onClose={() => props.setmodalContactHistory(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <ContactHistoryDrawerCard modalContactHistory={props.modalContactHistory} rowData={props.rowData}/>
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default ContactHistoryDrawer;

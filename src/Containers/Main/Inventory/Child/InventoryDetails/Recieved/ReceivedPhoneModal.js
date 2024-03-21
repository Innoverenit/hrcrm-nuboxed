import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const ReceivedPhoneList = lazy(() => import("./ReceivedPhoneList"))

const ReceivedPhoneModal = (props) => {
    const { ...formProps } = props;
    console.log(props.phnId)
    return (
        <>
            <StyledDrawer
                title="Received Data"
                width="50%"
                height="100vh"
                visible={props.addReceivePhone}

                onClose={() => props.handlereceivePhoneModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <ReceivedPhoneList
                        particularRowData={props.particularRowData}
                        orderPhoneId={props.orderPhoneId} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default ReceivedPhoneModal;

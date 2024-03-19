import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const ReceivedPhoneList = lazy(() => import("./ReceivedPhoneList"))

const ReceivedModal = (props) => {
    const { ...formProps } = props;
    console.log(props.phnId)
    return (
        <>
            <StyledDrawer
                title="Received Data"
                width="50%"
                height="100vh"
                visible={props.addReceivePhone}

                onCancel={() => props.handlereceivePhoneModal(false)}
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

export default ReceivedModal;

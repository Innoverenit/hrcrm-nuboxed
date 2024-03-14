import React, { Suspense, lazy } from "react";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const ReceivedPhoneList = lazy(() => import("./ReceivedPhoneList"))

const ReceivedModal = (props) => {
    const { ...formProps } = props;
    console.log(props.phnId)
    return (
        <>
            <StyledModal
                title="Received Data"
                width="50%"
                height="100vh"
                visible={props.addReceivePhone}
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onCancel={() => props.handlereceivePhoneModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <ReceivedPhoneList
                        particularRowData={props.particularRowData}
                        orderPhoneId={props.orderPhoneId} />
                </Suspense>
            </StyledModal>
        </>
    );
};

export default ReceivedModal;

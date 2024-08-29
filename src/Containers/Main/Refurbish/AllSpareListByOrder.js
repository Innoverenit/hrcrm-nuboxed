import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const ApproveSpareTable = lazy(() => import("./ApproveSpareTable"));

const AllSpareListByOrder = (props) => {
    const { approveSpareModal, handleAllSpareList, rowData, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={(`Approve Spares for Order # -${rowData.newOrderNo} `)}
                width="60%"
                visible={approveSpareModal}
                maskClosable={false}
                destroyOnClose
                onClose={() => handleAllSpareList(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <ApproveSpareTable rowData={rowData}
                     translateText={props.translateText}
                     selectedLanguage={props.selectedLanguage} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AllSpareListByOrder;

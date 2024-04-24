import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const TagInList = lazy(() => import("./TagInList"));

const TagInDrawer = (props) => {
    const { clickTagInDrawr, handleInTagDrawer, RowData, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="TagIn"
                width="60%"
                visible={clickTagInDrawr}
                closable
                destroyOnClose
                onClose={() => handleInTagDrawer(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <TagInList RowData={RowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default TagInDrawer;

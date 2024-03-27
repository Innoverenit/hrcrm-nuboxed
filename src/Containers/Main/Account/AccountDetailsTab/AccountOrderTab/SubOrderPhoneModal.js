import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
const SubOrderDetailsList = lazy(() => import("./SubOrderDetailsList"));

class SubOrderPhoneModal extends Component {
    render() {
        const {
            showSuborderPhoneList,
            handleSuborderPhone,
            subRow,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title={`Sub Order`}
                    width="60%"
                    visible={showSuborderPhoneList}
                    onClose={() => handleSuborderPhone(false)}
                    footer={null}
                    destroyOnClose
                    maskClosable={false}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <SubOrderDetailsList subRow={subRow} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default SubOrderPhoneModal;

import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import ReceivedUnitList from "./ReceivedUnitList";

class ItemWiseReceivedModal extends Component {
    render() {
        const {
            addReceiveUnit,
            handleReceivedUnit,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title={`${this.props.translatedMenuItems[48]} - ${this.props.row.suppliesFullName}`}
                    width="70%"
                    visible={addReceiveUnit}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handleReceivedUnit(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <ReceivedUnitList poSupplierSuppliesId={this.props.row.poSupplierSuppliesId}  translatedMenuItems={this.props.translatedMenuItems}/>
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default ItemWiseReceivedModal;

import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import PiTable from "./PiTable";


class PIOPenModal extends Component {
    render() {
        const {
            piButtonModal,
            handlePIModal,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title={`Proforma Invoice - ${this.props.particularRowData.newOrderNo}`}
                    width="70%"
                    visible={piButtonModal}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handlePIModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
<PiTable
 particularRowData={this.props.particularRowData}  
 distributorId={this.props.distributorId} 
 translatedMenuItems={this.props.translatedMenuItems}
 />
                      
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default PIOPenModal;

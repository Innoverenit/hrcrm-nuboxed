import React, {  Suspense, Component } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import ReceivedDetailCardOut from "./Child/InventoryDetails/InventoryMaterialTab/ReceivedDetailCardOut";

class ReceivedDetailModalOut extends Component {
    render() {
        const {
            addMaterialReceived,
            handleMaterialReceived,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title={`PO ID - ${this.props.row.newPoNumber}`}
                    width="90%"
                    visible={addMaterialReceived}
                    maskClosable={false}
                    destroyOnClose
                    onClose={() => handleMaterialReceived(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <ReceivedDetailCardOut row={this.props.row}  translatedMenuItems={this.props.translatedMenuItems}/>
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default ReceivedDetailModalOut;

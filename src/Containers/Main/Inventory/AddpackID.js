import React, { Component, Suspense, lazy } from "react";
import { StyledDrawer, } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import AddPackFormID from "./AddPackFormID";




class AddpackID extends Component {
    render() {
        const {
            addPackDataID,
            handlepackId,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                   title={`Order ID - ${this.props.rowData.newOrderNo}`}
                    width="60%"
                    visible={addPackDataID}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    onClose={() => handlepackId(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <AddPackFormID
                        orderPhoneId={this.props.rowData.orderPhoneId}
                        noOfPacket={this.props.rowData.noOfPacket}
                        />
                       
                    </Suspense>

                </StyledDrawer>
            </>
        );
    }
}

export default AddpackID;

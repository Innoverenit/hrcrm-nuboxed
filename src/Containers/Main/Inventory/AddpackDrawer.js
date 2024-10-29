import React, { Component, Suspense, lazy } from "react";
import { StyledDrawer, } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import AddPackForm from "./AddPackForm";



class AddpackDrawer extends Component {
    render() {
        const {
            addPackData,
            handleCreateAddPack,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title={`Order ID - ${this.props.rowData.newOrderNo}`}
                    width="60%"
                    height="45%"
                    visible={addPackData}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onClose={() => handleCreateAddPack(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <AddPackForm
                        orderPhoneId={this.props.rowData.orderPhoneId}
                        />
                       
                    </Suspense>

                </StyledDrawer>
            </>
        );
    }
}

export default AddpackDrawer;

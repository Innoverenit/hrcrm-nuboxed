import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import VendorActionLeft from "./VendorActionLeft";


class VendorHeader extends Component {
    render() {
        const {
            viewType,
            setVendorViewType,
            setCurrentData,
            currentData,
            handleClear,
            handleConfigureModal } = this.props;
        return (
            <div>
                <ActionHeader
                    leftComponent={
                        <VendorActionLeft
                            viewType={viewType}
                            setVendorViewType={setVendorViewType}
                            setCurrentData={setCurrentData}
                            currentData={currentData}
                            handleClear={handleClear}
                        />
                    }
                    // rightComponent={<VendorActionRight
                    //     viewType={viewType}
                    //      />}
                />
            </div>
        );
    }
}

export default VendorHeader;

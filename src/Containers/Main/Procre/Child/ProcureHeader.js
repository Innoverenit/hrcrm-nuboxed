import React, { Component } from "react";
import { ActionHeader } from "../../../../Components/Utils";
import ProcureActionLeft from "./ProcureActionLeft";

class ProcureHeader extends Component {
    render() {
        const {
            viewType,
            setProcreViewType,
            setCurrentData,
            currentData,
            handleClear,
            handleConfigureModal } = this.props;
        return (
            <div>
                <ActionHeader
                    leftComponent={
                        <ProcureActionLeft
                            viewType={viewType}
                            setProcreViewType={setProcreViewType}
                            setCurrentData={setCurrentData}
                            currentData={currentData}
                            handleClear={handleClear}
                        />
                    }
                    // rightComponent={<SuppliersActionRight
                    //     viewType={viewType}
                    //      />}
                />
            </div>
        );
    }
}

export default ProcureHeader;

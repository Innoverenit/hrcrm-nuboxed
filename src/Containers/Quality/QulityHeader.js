import React, { Component } from "react";
import { ActionHeader } from "../../Components/Utils";
import QulityActionLeft from "./QulityActionLeft";




class QulityHeader extends Component {
    render() {
        const {
            viewType,
            setQualityViewType,
            setCurrentData,
            currentData,
            handleClear,
            handleConfigureModal } = this.props;
        return (
            <div>
                <ActionHeader
                    leftComponent={
                        <QulityActionLeft
                            viewType={viewType}
                            setQualityViewType={setQualityViewType}
                            setCurrentData={setCurrentData}
                            currentData={currentData}
                            handleViewChange={this.props.handleViewChange}
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

export default QulityHeader;

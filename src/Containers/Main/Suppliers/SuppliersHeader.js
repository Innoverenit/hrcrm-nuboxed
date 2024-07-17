import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import SuppliersActionLeft from "./SuppliersActionLeft";
import SuppliersActionRight from "./SuppliersActionRight";

class SuppliersHeader extends Component {
    render() {
        const {
            viewType,
            setSuppliersViewType,
            setCurrentData,
            currentData,
            handleClear,
            handleConfigureModal } = this.props;
        return (
            <div>
                <ActionHeader
                    leftComponent={
                        <SuppliersActionLeft
                            viewType={viewType}
                            setSuppliersViewType={setSuppliersViewType}
                            setCurrentData={setCurrentData}
                            currentData={currentData}
                            handleClear={handleClear}
                            translateText={this.props.translateText}
                            translatedMenuItems={this.props.translatedMenuItems}
                            selectedLanguage={this.props.selectedLanguage}
                        />
                    }
                    rightComponent={<SuppliersActionRight
                        viewType={viewType}
                        translateText={this.props.translateText}
                            translatedMenuItems={this.props.translatedMenuItems}
                            selectedLanguage={this.props.selectedLanguage}
                        />}
                />
            </div>
        );
    }
}

export default SuppliersHeader;

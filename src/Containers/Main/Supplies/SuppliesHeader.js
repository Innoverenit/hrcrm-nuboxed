import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import SuppliesActionLeft from "./SuppliesActionLeft";
import SuppliesActionRight from "./SuppliesActionRight";

class SuppliesHeader extends Component {
    render() {
        const { viewType, setSuppliesViewType, handleConfigureModal } = this.props;
        return (
            <div>
                <ActionHeader
                    leftComponent={
                        <SuppliesActionLeft
                            viewType={viewType}
                            setSuppliesViewType={setSuppliesViewType}
                        />
                    }
                    rightComponent={<SuppliesActionRight 
                        viewType={viewType}
                        translateText={this.props.translateText}
                     selectedLanguage={this.props.selectedLanguage}
                    />}
                />
            </div>
        );
    }
}

export default SuppliesHeader;

import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import ClubActionLeft from "./ClubActionLeft";



class ClubHeader extends Component {
    render() {
        const {
            viewType,
            setClubViewType,
            setCurrentData,
            currentData,
            handleClear,
            handleConfigureModal,clubShareData } = this.props;
        return (
            <div>
                <ActionHeader
                    leftComponent={
                        <ClubActionLeft
                            viewType={viewType}
                            setClubViewType={setClubViewType}
                            setCurrentData={setCurrentData}
                            currentData={currentData}
                            handleClear={handleClear}
                            clubShareData={clubShareData}
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

export default ClubHeader;

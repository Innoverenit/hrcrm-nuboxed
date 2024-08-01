import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const RoomAndRackForm = lazy(() => import("./RoomAndRackForm"))

function InventoryRoomRackModal(props) {
    return (
        <>
            <StyledDrawer
               title={props.rowData.locationName}
                width="60%"
                visible={props.addroomrackininventory}
                destroyOnClose
                maskClosable={false}
                onClose={() => props.handleInventoryRoomRackModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <RoomAndRackForm rowData={props.rowData} translateText={props.translateText}
        translatedMenuItems={props.translatedMenuItems}
        selectedLanguage={props.selectedLanguage}/>
                </Suspense>
            </StyledDrawer>
        </>
    );
}

export default InventoryRoomRackModal;

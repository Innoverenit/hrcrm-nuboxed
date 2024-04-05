import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const RoomAndRackForm = lazy(() => import("./RoomAndRackForm"))

function InventoryRoomRackModal(props) {
    return (
        <>
            <StyledDrawer
               title={<FormattedMessage
                id="app.roomAndRack"
                defaultMessage="Room And Rack"
              />}
                // title="Room And Rack"
                width="60%"
                visible={props.addroomrackininventory}
                destroyOnClose
                maskClosable={false}
                onClose={() => props.handleInventoryRoomRackModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <RoomAndRackForm rowData={props.rowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
}

export default InventoryRoomRackModal;

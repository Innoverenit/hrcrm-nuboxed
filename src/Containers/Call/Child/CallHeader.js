import React, {  Suspense, lazy } from "react";
import { ActionHeader } from '../../../Components/Utils';
const CallActionLeft = lazy(() => import("./CallActionLeft"));
const CallActionRight = lazy(() => import("./CallActionRight"));

 function CallHeader (props) {

        const { viewType, setCallViewType } = props;
        return (
            <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
                <ActionHeader
                    leftComponent={null}
                    rightComponent={<CallActionRight
                        translatedMenuItems={props.translatedMenuItems}
                        selectedLanguage={props.selectedLanguage}
                        translateText={props.translateText}
                    />}
                />
            </div>
        )
}

export default CallHeader;
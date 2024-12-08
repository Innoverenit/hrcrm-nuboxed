import React, {  Suspense, lazy } from "react";
import { ActionHeader } from '../../../Components/Utils';
import { BundleLoader } from "../../../Components/Placeholder";
const CallActionLeft = lazy(() => import("./CallActionLeft"));
const CallActionRight = lazy(() => import("./CallActionRight"));

 function CallHeader (props) {

        const { viewType, setCallViewType } = props;
        return (
            <div className="sticky mt-1 z-50"> 
            
                <ActionHeader
                    leftComponent={null}
                    rightComponent={
                        <Suspense fallback={<BundleLoader />}>
                    <CallActionRight
                        translatedMenuItems={props.translatedMenuItems}
                        selectedLanguage={props.selectedLanguage}
                        translateText={props.translateText}
                    />
                    </Suspense>
                    }
                />
            </div>
        )
}

export default CallHeader;
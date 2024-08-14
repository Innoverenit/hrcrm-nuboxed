import React, { Component,lazy,Suspense } from 'react'
import { ActionHeader } from '../../../Components/Utils';
import { BundleLoader } from "../../../Components/Placeholder";
const EventActionRight =lazy(()=>import("./EventActionRight"));

class EventHeader extends Component {
    render() {
        // const { viewType, setEventViewType } = this.props;
        return (
            <div style={{position: "sticky",
            top: "3.35rem",
            zIndex: "998"}}>
                <Suspense fallback={<BundleLoader />}>
                <ActionHeader
                    leftComponent={null}
                    rightComponent={<EventActionRight
                    />}
                />
                </Suspense>
            </div>
        )
    }
}

export default EventHeader;
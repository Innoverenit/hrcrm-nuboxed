import React, { Component,lazy,Suspense } from 'react'
import { ActionHeader } from '../../../Components/Utils';
import { BundleLoader } from "../../../Components/Placeholder";
const EventActionRight =lazy(()=>import("./EventActionRight"));
const EventActionLeft =lazy(()=>import("./EventActionLeft"));

class EventHeader extends Component {
    render() {
        // const { viewType, setEventViewType } = this.props;
        return (
            <div className="sticky mt-1 z-50"> 
                <Suspense fallback={<BundleLoader />}>
                <ActionHeader
                    leftComponent={<EventActionLeft clickView={this.props.clickView}
                    setclickView={this.props.setclickView}/>}
                    rightComponent={<EventActionRight
                        selectedLanguage={this.props.selectedLanguage}
                        translateText={this.props.translateText}
                    />}
                />
                </Suspense>
            </div>
        )
    }
}

export default EventHeader;
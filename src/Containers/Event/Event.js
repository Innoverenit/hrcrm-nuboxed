import React, { Suspense, lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { handleEventModal } from "./EventAction";
const AddEventModal = lazy(() => import('./Child/AddEventModal'))
const EventHeader = lazy(() => import('./Child/EventHeader'))
const EventCardList = lazy(() => import('./Child/EventTable/EventCardList'))

function Event (props) {

        const { addEventModal, handleEventModal } = props;
        return (
            <React.Fragment>
                <EventHeader
                    handleEventModal={handleEventModal} />
                <AddEventModal
                    addEventModal={addEventModal}
                    handleEventModal={handleEventModal} />
                <Suspense fallback={<BundleLoader />}>
                    {/* <EventTable />
                     */}
                     <EventCardList/>
                </Suspense>
            </React.Fragment>
        )
}

const mapStateToProps = ({ event }) => ({
    addEventModal: event.addEventModal,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handleEventModal
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Event);
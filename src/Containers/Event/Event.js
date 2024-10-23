import React, { Suspense,useState, lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { handleEventModal } from "./EventAction";
const AddEventModal = lazy(() => import('./Child/AddEventModal'))
const EventHeader = lazy(() => import('./Child/EventHeader'))
const EventCardList = lazy(() => import('./Child/EventTable/EventCardList'))
const EventAllCardList = lazy(() => import('./Child/EventTable/EventAllcardList'))
function Event (props) {
   
        const { addEventModal, handleEventModal } = props;

const [clickView,setclickView]=useState("table");


        return (
            <React.Fragment>
                 <Suspense fallback={<BundleLoader />}>
                <EventHeader
                    selectedLanguage={props.selectedLanguage}
                    translateText={props.translateText}
                    handleEventModal={handleEventModal} 
                    clickView={clickView}
                    setclickView={setclickView}
                    />
                <AddEventModal
                    selectedLanguage={props.selectedLanguage}
                    translateText={props.translateText}
                    addEventModal={addEventModal}
                    handleEventModal={handleEventModal} />
               
                   {clickView==="table" ?
                     <EventCardList 
                     selectedLanguage={props.selectedLanguage}
                     translateText={props.translateText}
                     />:
clickView==="all" ?
                    <EventAllCardList
                    selectedLanguage={props.selectedLanguage}
                     translateText={props.translateText}/>
                    // <h2>Hello All</h2> 
                    :null}
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
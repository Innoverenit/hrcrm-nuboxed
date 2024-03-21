import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Input } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { MainWrapper } from "../../../Components/UI/Layout";
import { TextInput, } from "../../../Components/UI/Elements";
import dayjs from "dayjs";
import {
  getEvents,
  getEventCount,
  addEvents,
   removeEvents,
  updateEvents,
  searchEventName,
  ClearReducerDataOfEvent
} from "./EventAction";
const SingleEvent = lazy(() =>
  import("./SingleEvent")
);

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedEvents: [],
      isTextInputOpen: false,
      addingEvent: false,
      eventType: "",
      type:"",
      singleEvent: "",
      editInd:true,
    };
  }
  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getEvents();
      this.props.ClearReducerDataOfEvent();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      this.props.searchEventName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddEvent = () => {
    const { addEvents, events } = this.props;
    const { eventType, addingEvents, isTextInputOpen,editInd } = this.state;
    let event = { eventType,editInd };

    let exist =
    events &&
    events.some((element) => element.eventType == eventType);

    // if (exist) {
    //   message.error(
    //     "Can't create as another event type exists with same name!"
    //   );
    // } else {
      addEvents(event, () => console.log("add event callback"));
    // }

    this.setState({
        eventType: "",
      singleEvent: "",
      isTextInputOpen: false,
      editInd:true,
      currentData: "",
    });
  };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getEvents();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value })
   
  };
  handleDeleteEvent = (eventTypeId={eventTypeId}) => {
    this.props.removeEvents(eventTypeId);
    this.setState({ eventType: "", eventTypeId: "" });
  };
  handleUpdateEvent = (eventType,eventTypeId, editInd,cb) => {
    this.props.updateEvents(eventType,eventTypeId, editInd, cb);
    this.setState({ eventType: "", singleEvent: "",editInd:true });
  };
  // getLinkedDocuments = () => {
  //   axios
  //     .get(`${base_url}/opportunity/source/linkedSources`, {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({ linkedSources: res.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  componentDidMount() {
    const { getEvents,getEventCount,orgId } = this.props;
    console.log();
    getEvents();
    getEventCount(orgId)
  }
  render() {
    // const eventData = events && events.length > 0
    // ? [...events].sort((a, b) => {
    //     console.log(a.eventType, b.eventType); // Add this line for debugging
    //     return a.eventType.localeCompare(b.eventType);
    //   })
    // : [];

   
    // console.log("eventData",eventData)
    const {
      fetchingEvents,
      fetchingEventsError,
      events,
      addingEvents,
      updatingEvents,
    } = this.props;
    const {
      isTextInputOpen,
      eventType,
      singleEvent,
      linkedEvents,
    } = this.state;
    if (fetchingEvents) return <BundleLoader/>;
    if (fetchingEventsError) return <p>Error ...</p>;
    return (
      <>
 <div class="flex flex-nowrap" >
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
             <div class=" flex flex-row justify-between">
         <div class=" flex w-[18vw]" >
            <Input
         placeholder="Search by Name"
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
            onPressEnter={this.handleSearch}  
            onChange={this.handleChangeDes}
            // value={currentData}
          />
            </div>
            {isTextInputOpen ? (
              <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]"
            
              >
               
                <TextInput
                  placeholder="Add Event"
                  name="eventType"
                  value={eventType}
                  onChange={this.handleChange}
                  width="61%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!eventType}
                  loading={addingEvents}
                  onClick={this.handleAddEvent}
                  style={{ marginRight: "0.125em" }}
                >
                  Save
                </Button>
                &nbsp;
                <Button type="cancel"  onClick={this.toggleInput}>
                  Cancel
                </Button>
              </div>
            ) : (
              <>
             
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="button"
                    loading={addingEvents}
                    onClick={this.toggleInput}
                  >
                    Add More
                  </Button>
                </div>
               
              </>
            )}
              </div>
            <div class=" flex flex-col" >
            <MainWrapper className="!h-[69vh] !mt-2" >
              {events.length ? (
  events
    .slice() 
    .sort((a, b) => a.eventType.localeCompare(b.eventType)) 
    .map((event, i) => (
      <SingleEvent
        key={i}
        value={singleEvent}
        name="singleEvent"
        event={event}
        linkedEvents={linkedEvents}
        updatingEvents={updatingEvents}
        handleChange={this.handleChange}
        handleUpdateEvent={this.handleUpdateEvent}
        handleClear={this.handleClear}
        handleSearchChange={this.handleSearchChange}
        currentData={this.state.currentData}
        setCurrentData={this.setCurrentData}
        handleDeleteEvent={this.handleDeleteEvent}
      />
    ))
) : (
  <p>No Data Available</p>
)}
              </MainWrapper>
            </div>
         
          </MainWrapper>
        </div>
        <div class=" font-bold">Updated on {dayjs(this.props.events && this.props.events.length && this.props.events[0].updationDate).format('YYYY-MM-DD')} by {this.props.events && this.props.events.length && this.props.events[0].name}</div>
      </>
    );
  }
}

const mapStateToProps = ({ events,auth }) => ({
  addingEvents: events.addingEvents,
  addingEventsError: events.addingEventsError,
  events: events.events,
  orgId: auth.userDetails.organizationId,
  // removingEvents: event.removingEvents,
  // removingEventsError: event.removingEventsError,
     updatingEvents: events.updatingEvents,
     updatingEventsError: events.updatingEventsError,
  fetchingEvents: events.fetchingEvents,
  eventCount:events.eventCount,
  fetchingEventsError: events.fetchingEventsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEvents,
      getEventCount,
      addEvents,
       removeEvents,
       updateEvents,
       ClearReducerDataOfEvent,
       searchEventName,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Event);
